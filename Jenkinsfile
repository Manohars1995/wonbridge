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

        // Stage 11: Kubernetes Deployment
        stage('Kubernetes Deployment') {
            steps {
                script {
                    withEnv([
                        "KUBECONFIG=/opt/jenkins-wonbridge-kubeconfig.yaml"
                    ]) {
                        sh '''
                            set -e

                            IMAGE="${DOCKERHUB_REPO}:${BUILD_NUMBER}"

                            echo "=================================="
                            echo "WON BRIDGE KUBERNETES DEPLOYMENT"
                            echo "=================================="
                            echo "Namespace: ${K8S_NAMESPACE}"
                            echo "Image: $IMAGE"

                            echo "Updating Kubernetes deployment..."

                            kubectl set image \
                                deployment/${K8S_DEPLOYMENT} \
                                ${K8S_CONTAINER}=$IMAGE \
                                -n ${K8S_NAMESPACE}

                            echo "Waiting for rollout..."

                            if ! kubectl rollout status \
                                deployment/${K8S_DEPLOYMENT} \
                                -n ${K8S_NAMESPACE} \
                                --timeout=180s; then

                                echo "Deployment rollout failed."
                                echo "Starting automatic rollback..."

                                kubectl rollout undo \
                                    deployment/${K8S_DEPLOYMENT} \
                                    -n ${K8S_NAMESPACE}

                                kubectl rollout status \
                                    deployment/${K8S_DEPLOYMENT} \
                                    -n ${K8S_NAMESPACE} \
                                    --timeout=180s || true

                                exit 1
                            fi

                            echo "Checking application health..."

                            HEALTHY=false

                            for i in $(seq 1 12); do

                                if curl -fsS \
                                    http://127.0.0.1:${K8S_SERVICE_PORT}/ \
                                    -o /dev/null; then

                                    HEALTHY=true
                                    echo "Application health check passed."
                                    break
                                fi

                                echo "Health check attempt $i/12"
                                sleep 5
                            done

                            if [ "$HEALTHY" != "true" ]; then

                                echo "Application health check failed."
                                echo "Starting automatic rollback..."

                                kubectl rollout undo \
                                    deployment/${K8S_DEPLOYMENT} \
                                    -n ${K8S_NAMESPACE}

                                kubectl rollout status \
                                    deployment/${K8S_DEPLOYMENT} \
                                    -n ${K8S_NAMESPACE} \
                                    --timeout=180s || true

                                exit 1
                            fi

                            echo "Final Kubernetes deployment status:"

                            kubectl get deployment \
                                ${K8S_DEPLOYMENT} \
                                -n ${K8S_NAMESPACE}

                            kubectl get pods \
                                -n ${K8S_NAMESPACE}

                            kubectl get svc \
                                -n ${K8S_NAMESPACE}

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
