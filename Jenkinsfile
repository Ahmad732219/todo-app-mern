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
                sh 'docker rm -f todo-mongodb todo-backend todo-frontend || true'
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
            mail to: 'ahmadsilent25@gmail.com',
                 subject: '✅ Build SUCCESS - Todo App',
                 body: '3-Tier MERN Todo App successfully deployed on AWS EC2!'
        }
        failure {
            echo 'Deployment Failed! ❌'
            mail to: 'ahmadsilent25@gmail.com',
                 subject: '❌ Build FAILED - Todo App',
                 body: 'Something went wrong with the Todo App pipeline!'
        }
    }
}
