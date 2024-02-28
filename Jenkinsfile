pipeline {
    agent any 

    stages {
        stage('Frontend, Install Dependencies & Run Tests') {
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

        stage('Backend, Install Dependencies & Run Tests') {
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