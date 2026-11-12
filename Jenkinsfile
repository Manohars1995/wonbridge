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
        stage('Git Checkout') {
            steps {
                checkout scm
                echo "Successfully cloned ${APP_NAME}"
                sh 'git log -1 --oneline'
            }
        }

        stage('Project Validation') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        test -f package.json
                        test -f package-lock.json
                        test -f vite.config.ts
                        echo "Application structure verified."
                    '''
                }
            }
        }

        stage('Node.js Validation') {
            steps {
                sh '''
                    node --version
                    npm --version
                '''
            }
        }

       stage('Ansible Server Validation') {
         steps {
           sh '''
             ansible-playbook \
               -i /opt/ansible/inventory/hosts \
              /opt/ansible/playbooks/server-info.yml
        '''
    }
}

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm ci'
                }
            }
        }
        stage('SonarQube Code Analysis') {
    steps {
        dir("${APP_DIR}") {
            script {
                def scannerHome = tool 'SonarScanner'

                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=won-bridge \
                            -Dsonar.projectName="WON Bridge" \
                            -Dsonar.sources=src \
                            -Dsonar.sourceEncoding=UTF-8 \
                            -Dsonar.exclusions="**/node_modules/**,**/dist/**,**/coverage/**"
                    """
                }
            }
        }
    }
}

        stage('Code Quality - ESLint') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run lint'
                }
            }
        }

        stage('Production Build') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts(
                    artifacts: 'WON-BRIDGE-main/dist/**',
                    fingerprint: true
                )
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
