pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning GitHub Repository...'
                checkout scm
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo 'Stopping old containers...'
                sh 'docker-compose down || true'
            }
        }

        stage('Build and Start Containers') {
            steps {
                echo 'Building and starting all 3 tiers...'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '3-Tier Todo App Deployed Successfully! 🚀'
        }
        failure {
            echo 'Deployment Failed! ❌'
        }
    }
}
