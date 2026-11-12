pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = 'WON-BRIDGE'
        APP_DIR = 'WON-BRIDGE-main'
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

        // Stage 6: SonarQube Code Analysis
        stage('SonarQube Code Analysis') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        def scannerHome = tool 'SonarScanner'

                        withSonarQubeEnv('SonarQube') {
                            withCredentials([
                                string(
                                    credentialsId: 'sonarqube-jenkins-token',
                                    variable: 'SONAR_TOKEN'
                                )
                            ]) {
                                withEnv(["SCANNER_HOME=${scannerHome}"]) {
                                    sh '''
                                        "$SCANNER_HOME/bin/sonar-scanner" \
                                            -Dsonar.projectKey=won-bridge \
                                            -Dsonar.projectName="WON Bridge" \
                                            -Dsonar.sources=src \
                                            -Dsonar.sourceEncoding=UTF-8 \
                                            -Dsonar.token="$SONAR_TOKEN" \
                                            -Dsonar.exclusions="**/node_modules/**,**/dist/**,**/coverage/**"
                                    '''
                                }
                            }
                        }
                    }
                }
            }
        }

        // Stage 7: Code Quality
        stage('Code Quality - ESLint') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run lint'
                }
            }
        }

        // Stage 8: Production Build
        stage('Production Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        // Stage 9: Archive Build Artifacts
        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts(
                    artifacts: 'WON-BRIDGE-main/dist/**',
                    fingerprint: true
                )
            }
        }

        // Stage 10: Docker Image Build
        stage('Docker Image Build') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        docker build \
                            -t wonbridge-frontend:${BUILD_NUMBER} \
                            -t wonbridge-frontend:latest \
                            .

                        docker images wonbridge-frontend
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'WON Bridge CI pipeline completed successfully.'
        }

        failure {
            echo 'WON Bridge CI pipeline failed. Check the console output.'
        }

        always {
            echo 'WON Bridge pipeline execution finished.'
        }
    }
}
