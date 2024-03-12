/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'jenkins',
                    credentialsId: '2a437b8e-a86a-4595-862e-8247ff08ac8d',
                    url: 'https://github.com/KristiinaSa/HomeAutomationSystem'
                }
            }
        }

        stage('Frontend, Install Dependencies & Run Tests') {
            steps {
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                            sh 'npm test'
                            sh 'npm test -- --coverage'
                        } else {
                            bat 'npm install'
                            bat 'npm test'
                            bat 'npm test -- --coverage'
                        }
                    }
                }
            }
        }

        stage('Backend, Install Dependencies & Run Tests') {
            steps {
                withCredentials([
            string(credentialsId: 'db-host', variable: 'DB_HOST'),
            string(credentialsId: 'db-name', variable: 'DB_NAME'),
            usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASSWORD'),
            string(credentialsId: 'test-db-name', variable: 'TEST_DB_NAME'),
            usernamePassword(credentialsId: 'test-db-credentials', usernameVariable: 'TEST_DB_USER', passwordVariable: 'TEST_DB_PASSWORD'),
            string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')
        ]) {
                    dir('backend') {
                        script {
                            if (isUnix()) {
                                sh 'npm install'
                                sh 'npm test'
                                sh 'npm test -- --coverage'
                    } else {
                                bat 'npm install'
                                bat 'npm test'
                                bat 'npm test -- --coverage'
                            }
                        }
                    }
        }
            }
        }
        stage('Build and Run Docker Compose') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose build'
                    // sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose build'
                    // bat 'docker-compose up -d'
                    }
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        if (isUnix()) {
                            sh 'docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD'
                            sh 'docker tag backend:latest $DOCKER_HUB_USERNAME/backend:latest'
                            sh 'docker push $DOCKER_HUB_USERNAME/backend:latest'
                            sh 'docker tag frontend:latest $DOCKER_HUB_USERNAME/frontend:latest'
                            sh 'docker push $DOCKER_HUB_USERNAME/frontend:latest'
                } else {
                            bat 'docker login -u %DOCKER_HUB_USERNAME% -p %DOCKER_HUB_PASSWORD%'
                            bat 'docker tag backend:latest %DOCKER_HUB_USERNAME%/backend:latest'
                            bat 'docker push %DOCKER_HUB_USERNAME%/backend:latest'
                            bat 'docker tag frontend:latest %DOCKER_HUB_USERNAME%/frontend:latest'
                            bat 'docker push %DOCKER_HUB_USERNAME%/frontend:latest'
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            cobertura coberturaReportFile: '**/coverage/cobertura-coverage.xml'
        }
    }
}
