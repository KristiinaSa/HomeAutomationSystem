pipeline {
    agent any 

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') { 
                    script {
                        if (isUnix()) {
                            sh 'npm install' 
                            sh 'npm test' 
                        } else {
                            bat 'npm install'
                            bat 'npm test'
                        }
                    }
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    script {
                        if (isUnix()) {
                            sh 'npm install' 
                            sh 'npm test' 
                        } else {
                            bat 'npm install'
                            bat 'npm test'
                        }
                    }
                }
            }
        }
    }
}