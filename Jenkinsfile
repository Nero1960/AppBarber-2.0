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
                    // Limpia únicamente los recursos huérfanos del espacio de CI de este proyecto
                    sh 'docker compose -p appbarber-ci down --remove-orphans || true'
                }
            }
        }

        stage('Build & Run Tests (Docker Compose)') {
            steps {
                script {
                    // Levantamos los servicios usando un namespace de proyecto propio (-p appbarber-ci)
                    sh 'docker compose -p appbarber-ci up -d db server client'
                    
                    // Ejecutamos las pruebas automatizadas (Playwright/Maven) en el mismo entorno aislado
                    sh 'docker compose -p appbarber-ci run --rm tests'
                }
            }
        }
    }
    
    post {
        always {
            // Destruye y limpia únicamente los contenedores y volúmenes temporales de Jenkins
            sh 'docker compose -p appbarber-ci down -v --remove-orphans || true'
        }
        success {
            echo '¡Las pruebas automatizadas pasaron con éxito!'
        }
        failure {
            echo '¡Las pruebas fallaron. Revisa los logs!'
        }
    }
}