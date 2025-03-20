import AuthController from "../../controllers/authController";
import AuthRepository from "../../repositories/authRepository";
import TokenRepository from "../../repositories/tokenRepository";
import AuthService from "../../services/authService";
import TokenService from "../../services/tokenService";
import EmailService from "../../services/emailService";


// Crear instancias de repositorios
const tokenRepository = new TokenRepository();
const authRepository = new AuthRepository();

// Crear instancias de servicios inyectando los repositorios
const tokenService = new TokenService(tokenRepository);
const emailService = new EmailService();
const authService = new AuthService(authRepository, tokenService, emailService);

// Crear instancia del controlador inyectando los servicios
const authController = new AuthController(authService);

export { authController };
