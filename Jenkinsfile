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
                    // Limpia contenedores huérfanos o nombres repetidos antes de arrancar
                    sh 'docker compose down --remove-orphans || true'
                }
            }
        }

        stage('Build & Run Tests (Docker Compose)') {
            steps {
                script {
                    sh 'docker compose up -d db server client'
                    
                    // Aquí es donde lanzas tu contenedor de pruebas con Playwright/Maven
                    sh 'docker compose run --rm tests'
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker compose down -v'
        }
        success {
            echo '¡Las pruebas automatizadas pasaron con éxito!'
        }
        failure {
            echo '¡Las pruebas fallaron. Revisa los logs!'
        }
    }
}