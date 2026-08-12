pipeline {
    agent any

    tools {
        jdk 'JDK25'
        maven 'Maven3'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment Files') {
            steps {
                script {
                    withCredentials([
                        file(credentialsId: 'server/.env', variable: 'SERVER_ENV'),
                        file(credentialsId: 'client/.env', variable: 'CLIENT_ENV')
                    ]) {
                        sh 'cp $SERVER_ENV server/.env'
                        sh 'cp $CLIENT_ENV client/.env'
                    }
                }
            }
        }

        stage('Clean Old Containers') {
            steps {
                script {
                    // Se agrega -f para que limpie basándose en el archivo principal
                    sh 'docker compose -f docker-compose.yml down --remove-orphans || true'
                }
            }
        }

        stage('Build & Run Tests (Docker Compose)') {
            steps {
                script {
                    try {
                        // Se agrega -f docker-compose.yml para forzar el uso del archivo sin volúmenes
                        sh 'docker compose -f docker-compose.yml --profile tests up -d db server client'
                        sh 'docker compose -f docker-compose.yml --profile tests run --rm tests'
                    } catch (Exception e) {
                        // Se agrega -f también al pedir los logs
                        sh 'docker compose -f docker-compose.yml --profile tests logs server'
                        throw e
                    }
                }       
            }
        }
    }
    
    post {
        always {
            // Se asegura de apagar usando el archivo correcto
            sh 'docker compose -f docker-compose.yml down -v'
        }
        success {
            echo '¡Las pruebas automatizadas pasaron con éxito!'
        }
        failure {
            echo '¡Las pruebas fallaron. Revisa los logs!'
        }
    }
}