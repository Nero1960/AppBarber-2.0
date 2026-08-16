#!/bin/sh
set -e

# El navegador (Chromium) dentro del contenedor debe alcanzar la UI, API y BD
# vía los puertos publicados del host Docker. "extra_hosts: localhost:host-gateway"
# agrega el gateway, pero /etc/hosts conserva las líneas de loopback
# (127.0.0.1 / ::1), que tienen prioridad y apuntan a un puerto donde nada escucha
# dentro del contenedor -> net::ERR_CONNECTION_REFUSED.
# Al eliminarlas, "localhost" resuelve únicamente al gateway del host.
# Nota: /etc/hosts es un bind-mount, no se puede renombrar (sed -i falla),
# así que se edita una copia y se escribe de vuelta en el mismo archivo.
cp /etc/hosts /tmp/hosts
sed -i '/^127\.0\.0\.1[[:space:]]\+localhost/d' /tmp/hosts
sed -i '/::/d' /tmp/hosts
cat /tmp/hosts > /etc/hosts

# Chromium ignora /etc/hosts para "localhost" (lo resuelve siempre al loopback
# del contenedor). Se exporta la IP del gateway del host para que Playwright
# lance Chromium con --host-resolver-rules=MAP localhost <gateway>.
GATEWAY=$(awk '$2 == "localhost" {print $1; exit}' /etc/hosts)
if [ -n "$GATEWAY" ]; then
    export HOST_GATEWAY_IP="$GATEWAY"
fi

exec "$@"
