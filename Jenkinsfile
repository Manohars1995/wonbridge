
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = 'WON-BRIDGE'
    }

    stages {

        stage('Git Checkout') {
            steps {
                checkout scm

                echo "Successfully cloned ${APP_NAME}"
                sh 'git log -1 --oneline'
            }
        }

        stage('Project Structure') {
            steps {
                sh '''
                    echo "Checking project files..."
                    pwd
                    ls -la

                    echo "Searching package.json files..."
                    find . -name package.json \
                        -not -path "*/node_modules/*" \
                        -not -path "*/.git/*"
                '''
            }
        }

        stage('Node.js Validation') {
            steps {
                sh '''
                    echo "Node.js version:"
                    node --version

                    echo "NPM version:"
                    npm --version

                    echo "Checking package.json..."
                    find . -name package.json \
                        -not -path "*/node_modules/*" \
                        -not -path "*/.git/*" \
                        -exec sh -c '
                            echo "Checking: $1"
                            node -e "JSON.parse(require(\\"fs\\").readFileSync(process.argv[1]))" "$1"
                        ' _ {} \\;
                '''
            }
        }

        stage('Build and Test') {
            steps {
                echo 'Build and test stages will be configured after inspecting the project structure.'
            }
        }
    }

    post {
        success {
            echo 'WON Bridge CI pipeline completed successfully.'
        }

        failure {
            echo 'WON Bridge CI pipeline failed. Check the Jenkins console output.'
        }

        always {
            echo 'WON Bridge pipeline execution finished.'
        }
    }
}
