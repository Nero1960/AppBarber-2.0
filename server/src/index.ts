import colors from 'colors'
import server from './server';

//Definir el puerto
const port = process.env.PORT || 4000;

//Arrancar el servidor en el puerto establecido
server.listen(port, () => {
    console.log(colors.white.bgGreen(`Servidor funcionando en el puerto ${port}`))
})

