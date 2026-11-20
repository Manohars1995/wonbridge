
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = 'WON-BRIDGE'
        APP_DIR = 'WON-BRIDGE-main'
        DOCKERHUB_REPO = 'manohar11995/wonbridge-frontend'
        K8S_NAMESPACE = 'wonbridge-test'
        K8S_DEPLOYMENT = 'wonbridge-frontend'
        K8S_CONTAINER = 'wonbridge-frontend'
        K8S_SERVICE_PORT = '30177'
    }

    stages {

        // Stage 1: Git Checkout
        stage('Git Checkout') {
            steps {
                checkout scm
                echo "Successfully cloned ${APP_NAME}"
                sh 'git log -1 --oneline'
            }
        }

        // Stage 2: Project Validation
        stage('Project Validation') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -e
                        test -f package.json
                        test -f package-lock.json
                        test -f vite.config.ts
                        test -f Dockerfile
                        echo "Application structure verified."
                    '''
                }
            }
        }

        // Stage 3: Node.js Validation
        stage('Node.js Validation') {
            steps {
                sh '''
                    node --version
                    npm --version
                '''
            }
        }

        // Stage 4: Ansible Server Validation
        stage('Ansible Server Validation') {
            steps {
                sh '''
                    ansible-playbook \
                        -i /opt/ansible/inventory/hosts \
                        /opt/ansible/playbooks/server-info.yml
                '''
            }
        }

        // Stage 5: Install Dependencies
        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm ci'
                }
            }
        }

        // Stage 6: Code Quality - ESLint
        stage('Code Quality - ESLint') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run lint'
                }
            }
        }

        // Stage 7: Production Build
        stage('Production Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        // Stage 8: Archive Build Artifacts
        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts(
                    artifacts: 'WON-BRIDGE-main/dist/**',
                    fingerprint: true
                )
            }
        }

        // Stage 9: Docker Image Build
        stage('Docker Image Build') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        set -e

                        docker build \
                            -t wonbridge-frontend:${BUILD_NUMBER} \
                            -t wonbridge-frontend:latest \
                            .

                        docker images wonbridge-frontend
                    '''
                }
            }
        }

        // Stage 10: Docker Hub Image Push
        stage('Docker Hub Image Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -e

                        echo "$DOCKERHUB_TOKEN" | docker login \
                            -u "$DOCKERHUB_USER" \
                            --password-stdin

                        docker tag wonbridge-frontend:${BUILD_NUMBER} \
                            "$DOCKERHUB_USER/wonbridge-frontend:${BUILD_NUMBER}"

                        docker tag wonbridge-frontend:${BUILD_NUMBER} \
                            "$DOCKERHUB_USER/wonbridge-frontend:latest"

                        docker push \
                            "$DOCKERHUB_USER/wonbridge-frontend:${BUILD_NUMBER}"

                        docker push \
                            "$DOCKERHUB_USER/wonbridge-frontend:latest"

                        echo "Docker Hub image push completed."
                    '''
                }
            }
        }

        // Stage 11: Kubernetes Deployment with Automatic Rollback
        stage('Kubernetes Deployment') {
            steps {
                script {
                    withEnv([
                        "KUBECONFIG=/opt/jenkins-wonbridge-kubeconfig.yaml"
                    ]) {
                        sh '''
                            set -eu

                            DEPLOYMENT="deployment/${K8S_DEPLOYMENT}"
                            IMAGE="${DOCKERHUB_REPO}:${BUILD_NUMBER}"

                            echo "=================================="
                            echo "WON BRIDGE KUBERNETES DEPLOYMENT"
                            echo "=================================="

                            echo "Namespace: ${K8S_NAMESPACE}"
                            echo "New image: $IMAGE"

                            // Capture existing deployment image
                            PREVIOUS_IMAGE=$(kubectl get "$DEPLOYMENT" \
                                -n "$K8S_NAMESPACE" \
                                -o jsonpath="{.spec.template.spec.containers[?(@.name=='${K8S_CONTAINER}')].image}")

                            if [ -z "$PREVIOUS_IMAGE" ]; then
                                echo "ERROR: Previous image not found."
                                exit 1
                            fi

                            echo "Previous image: $PREVIOUS_IMAGE"

                            // Automatic rollback function
                            rollback_deployment() {

                                echo "=================================="
                                echo "AUTOMATIC ROLLBACK STARTED"
                                echo "=================================="

                                echo "Restoring image: $PREVIOUS_IMAGE"

                                if ! kubectl set image "$DEPLOYMENT" \
                                    "${K8S_CONTAINER}=$PREVIOUS_IMAGE" \
                                    -n "$K8S_NAMESPACE"; then

                                    echo "ERROR: Failed to restore previous image."
                                    return 1
                                fi

                                echo "Waiting for rollback rollout..."

                                if ! kubectl rollout status "$DEPLOYMENT" \
                                    -n "$K8S_NAMESPACE" \
                                    --timeout=180s; then

                                    echo "ERROR: Rollback rollout failed."
                                    return 1
                                fi

                                RESTORED_IMAGE=$(kubectl get "$DEPLOYMENT" \
                                    -n "$K8S_NAMESPACE" \
                                    -o jsonpath="{.spec.template.spec.containers[?(@.name=='${K8S_CONTAINER}')].image}")

                                echo "Restored image: $RESTORED_IMAGE"

                                if [ "$RESTORED_IMAGE" != "$PREVIOUS_IMAGE" ]; then
                                    echo "ERROR: Previous image verification failed."
                                    return 1
                                fi

                                echo "Checking application health after rollback..."

                                for i in $(seq 1 12); do

                                    if curl -fsS \
                                        "http://127.0.0.1:${K8S_SERVICE_PORT}/" \
                                        -o /dev/null; then

                                        echo "Rollback health check passed."
                                        return 0
                                    fi

                                    echo "Rollback health attempt $i/12"
                                    sleep 5
                                done

                                echo "ERROR: Application unhealthy after rollback."
                                return 1
                            }

                            // Deploy new image
                            if [ "$PREVIOUS_IMAGE" = "$IMAGE" ]; then
                                echo "Deployment already uses this image."
                            else
                                echo "Updating Kubernetes deployment..."

                                kubectl set image "$DEPLOYMENT" \
                                    "${K8S_CONTAINER}=$IMAGE" \
                                    -n "$K8S_NAMESPACE"
                            fi

                            // Check rollout
                            echo "Waiting for deployment rollout..."

                            if ! kubectl rollout status "$DEPLOYMENT" \
                                -n "$K8S_NAMESPACE" \
                                --timeout=180s; then

                                echo "ERROR: Kubernetes rollout failed."

                                if ! rollback_deployment; then
                                    echo "CRITICAL: Automatic rollback failed."
                                fi

                                exit 1
                            fi

                            // Application health check
                            echo "Checking application health..."

                            HEALTHY=false

                            for i in $(seq 1 12); do

                                if curl -fsS \
                                    "http://127.0.0.1:${K8S_SERVICE_PORT}/" \
                                    -o /dev/null; then

                                    HEALTHY=true
                                    echo "Application health check passed."
                                    break
                                fi

                                echo "Health attempt $i/12"
                                sleep 5
                            done

                            // Rollback if application is unhealthy
                            if [ "$HEALTHY" != "true" ]; then

                                echo "ERROR: Application health check failed."

                                if ! rollback_deployment; then
                                    echo "CRITICAL: Automatic rollback failed."
                                fi

                                exit 1
                            fi

                            echo "=================================="
                            echo "FINAL DEPLOYMENT STATUS"
                            echo "=================================="

                            kubectl get deployment "$K8S_DEPLOYMENT" \
                                -n "$K8S_NAMESPACE"

                            kubectl get pods \
                                -n "$K8S_NAMESPACE"

                            kubectl get svc \
                                -n "$K8S_NAMESPACE"

                            echo "WON Bridge Kubernetes deployment successful."
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'WON Bridge CI/CD pipeline completed successfully.'
            echo 'Docker image pushed and Kubernetes deployment verified.'
            echo 'Application URL: http://175.101.46.108:30177'
        }

        failure {
            echo 'WON Bridge pipeline failed. Check the console output.'
        }

        always {
            sh 'docker logout || true'
            echo 'WON Bridge pipeline execution finished.'
        }
    }
}
