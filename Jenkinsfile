/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main',
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
            post {
                always {
                    cobertura coberturaReportFile: 'frontend/coverage/cobertura-coverage.xml'
                }
            }
        }

        stage('Backend, Install Dependencies & Run Tests') {
            environment {
                DB_HOST = 'localhost'
                DB_NAME = 'homeautomation'
                DB_USER = 'root'
                DB_PASSWORD = '7hXr6VUUB9zyaAC8eaUy'
                TEST_DB_NAME = 'homeautomation_test'
                TEST_DB_USER = 'root'
                TEST_DB_PASSWORD = '7hXr6VUUB9zyaAC8eaUy'
                JWT_SECRET = '1ed94aeefcc6e8689525eb2dbece423cbb5d2ed16ac3ed678876d07e258ad1dc'
            }
            steps {
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
            post {
                always {
                    cobertura coberturaReportFile: 'frontend/coverage/cobertura-coverage.xml'
                }
            }
        }
    }
}
