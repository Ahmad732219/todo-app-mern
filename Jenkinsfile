pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE_BACKEND  = 'ahmad081/todo-backend'
        DOCKER_IMAGE_FRONTEND = 'ahmad081/todo-frontend'
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning GitHub Repository...'
                git credentialsId: 'github-credentials',
                    url: 'https://github.com/Ahmad732219/todo-app-mern.git',
                    branch: 'main'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube Code Analysis...'
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        /opt/sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=todo-app-mern \
                        -Dsonar.projectName="Todo App MERN" \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000
                    '''
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo 'Stopping old containers...'
                sh 'docker rm -f todo-mongodb todo-backend todo-frontend || true'
                sh 'docker-compose down || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker-compose build'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing images to Docker Hub...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker tag todo-app-pipeline_backend:latest ahmad081/todo-backend:latest'
                sh 'docker tag todo-app-pipeline_frontend:latest ahmad081/todo-frontend:latest'
                sh 'docker push ahmad081/todo-backend:latest'
                sh 'docker push ahmad081/todo-frontend:latest'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying 3-Tier Application...'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh 'sleep 10'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '3-Tier Todo App Deployed Successfully!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
