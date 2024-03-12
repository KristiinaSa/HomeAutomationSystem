/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    stages {
        stage('Install Dependencies & Run Tests') {
            parallel {
                stage('Frontend') {
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
                stage('Backend') {
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
            }
        }
        stage('Build and Run Docker Compose') {
            steps {
                script {
                    withCredentials([
                string(credentialsId: 'port', variable: 'PORT'),
                string(credentialsId: 'db-host', variable: 'DB_HOST'),
                string(credentialsId: 'db-name', variable: 'DB_NAME'),
                usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASSWORD'),
                string(credentialsId: 'test-db_name', variable: 'TEST_DB_NAME'),
                usernamePassword(credentialsId: 'test-db-credentials', usernameVariable: 'TEST_DB_USER', passwordVariable: 'TEST_DB_PASSWORD'),
                string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET'),
            ]) {
                        if (isUnix()) {
                            sh 'docker-compose build'
                            sh 'docker-compose up -d'
                } else {
                            bat 'docker-compose build'
                            bat 'docker-compose up -d'
                        }
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
                            sh 'docker tag homeautomationsystem-backend:latest $DOCKER_HUB_USERNAME/homeautomationsystem-backend:latest'
                            sh 'docker push $DOCKER_HUB_USERNAME/homeautomationsystem-backend:latest'
                            sh 'docker tag homeautomationsystem-frontend:latest $DOCKER_HUB_USERNAME/homeautomationsystem-frontend:latest'
                            sh 'docker push $DOCKER_HUB_USERNAME/homeautomationsystem-frontend:latest'
                } else {
                            bat 'docker login -u %DOCKER_HUB_USERNAME% -p %DOCKER_HUB_PASSWORD%'
                            bat 'docker tag homeautomationsystem-backend:latest %DOCKER_HUB_USERNAME%/homeautomationsystem-backend:latest'
                            bat 'docker push %DOCKER_HUB_USERNAME%/homeautomationsystem-backend:latest'
                            bat 'docker tag homeautomationsystem-frontend:latest %DOCKER_HUB_USERNAME%/homeautomationsystem-frontend:latest'
                            bat 'docker push %DOCKER_HUB_USERNAME%/homeautomationsystem-frontend:latest'
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                if (isUnix()) {
                    sh 'docker-compose down'
            } else {
                    bat 'docker-compose down'
                }
            }
            cobertura coberturaReportFile: '**/coverage/cobertura-coverage.xml'
        }
    }
}
