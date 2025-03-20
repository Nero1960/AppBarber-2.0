//Clase que extiende de Error para manejar los errores de la aplicación
class AppError extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'App Error';
    }
}
export default AppError;