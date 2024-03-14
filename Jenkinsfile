/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any
    environment {
        DB_HOST = credentials('db-host')
        DB_NAME = credentials('db-name')
        TEST_DB_NAME = credentials('test-db-name')
        JWT_SECRET = credentials('jwt-secret')
        PORT = credentials('port')
        DB_PORT = credentials('db-port')
        VITE_PROXY_HOST = credentials('vite-proxy-host')
    }
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
                    usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASSWORD'),
                    usernamePassword(credentialsId: 'test-db-credentials', usernameVariable: 'TEST_DB_USER', passwordVariable: 'TEST_DB_PASSWORD'),
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
                    usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASSWORD'),
                    usernamePassword(credentialsId: 'test-db-credentials', usernameVariable: 'TEST_DB_USER', passwordVariable: 'TEST_DB_PASSWORD'),
                    ]) {
                        env.DB_HOST = "${DB_HOST}"
                        env.DB_NAME = "${DB_NAME}"
                        env.DB_USER = "${DB_USER}"
                        env.DB_PASSWORD = "${DB_PASSWORD}"
                        env.TEST_DB_NAME = "${TEST_DB_NAME}"
                        env.TEST_DB_USER = "${TEST_DB_USER}"
                        env.TEST_DB_PASSWORD = "${TEST_DB_PASSWORD}"
                        env.JWT_SECRET = "${JWT_SECRET}"
                        env.PORT = "${PORT}"
                    }
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
