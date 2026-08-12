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
                    sh 'ls -la server/.env'
                     // Asegura que cargue el perfil de pruebas igual que en tu terminal
                    sh 'docker compose --profile tests up -d db server client'
            
                    // Lanza el contenedor de pruebas de Playwright/Maven
                    sh 'docker compose --profile tests run --rm tests'
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