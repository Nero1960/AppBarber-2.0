pipeline {
    agent any

    environment {
        // Proyecto aislado de CI: evita colisionar con el stack local
        // (nombres de contenedores, red y volúmenes propios de appbarber_ci).
        COMPOSE_PROJECT = 'appbarber_ci'
    }

    stages {
        stage('Limpieza previa') {
            steps {
                // Idempotente: elimina contenedores/red residuales de builds anteriores
                sh 'docker compose -p $COMPOSE_PROJECT down --remove-orphans || true'
            }
        }

        stage('Preparar entorno') {
            steps {
                // server/.env y client/.env se generan SIEMPRE desde las credenciales
                // Secret file homónimas; se normaliza CRLF -> LF por si el archivo
                // original se editó en Windows.
                withCredentials([file(credentialsId: 'server/.env', variable: 'SERVER_ENV_FILE')]) {
                    sh 'cp "$SERVER_ENV_FILE" server/.env'
                    sh 'sed -i "s/\r$//" server/.env'
                }
                withCredentials([file(credentialsId: 'client/.env', variable: 'CLIENT_ENV_FILE')]) {
                    sh 'cp "$CLIENT_ENV_FILE" client/.env'
                    sh 'sed -i "s/\r$//" client/.env'
                }
                // Diagnóstico: claves no sensibles presentes en server/.env
                sh 'grep -E "^(DATABASE_HOST|DATABASE_PORT|DATABASE_NAME|PORT|FRONTEND_URL|MYSQL_DATABASE|SMTP_HOST|SMTP_PORT)=" server/.env || true'
            }
        }

        stage('Levantar stack') {
            steps {
                sh 'docker compose -p $COMPOSE_PROJECT up -d --build db server client'
                sh 'docker compose -p $COMPOSE_PROJECT ps -a || true'
            }
        }

        stage('Ejecutar tests') {
            steps {
                sh 'docker compose -p $COMPOSE_PROJECT run --rm tests'
            }
        }
    }

    post {
        always {
            script {
                // Evidencia: volcar logs de todos los contenedores ANTES de la limpieza.
                // docker compose logs funciona también sobre contenedores detenidos.
                sh 'docker compose -p $COMPOSE_PROJECT logs --no-color --tail 300 > appbarber-ci-containers.log 2>&1 || true'
                sh 'cat appbarber-ci-containers.log || true'
            }
            archiveArtifacts artifacts: 'appbarber-ci-containers.log', allowEmptyArchive: true

            // Limpieza sin -v: conserva appbarber_ci_db_data con las precondiciones (usuarios, tokens)
            sh 'docker compose -p $COMPOSE_PROJECT down --remove-orphans || true'
        }
    }
}
