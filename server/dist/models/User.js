"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Appointment_1 = __importDefault(require("./Appointment"));
const Testimonials_1 = __importDefault(require("./Testimonials"));
const Token_1 = __importDefault(require("./Token"));
const AppointmentCancellation_1 = __importDefault(require("./AppointmentCancellation"));
let User = class User extends sequelize_typescript_1.Model {
    appointment;
    testimonials;
    // Relación uno a muchos con AppointmentCancellation
    appointmentCancellations;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: true
    }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(12),
        allowNull: false
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT,
        allowNull: false
    }),
    __metadata("design:type", Number)
], User.prototype, "confirmed", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT(),
        allowNull: false
    }),
    __metadata("design:type", Number)
], User.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('default.png'),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Token_1.default),
    __metadata("design:type", Array)
], User.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Appointment_1.default),
    __metadata("design:type", Array)
], User.prototype, "appointment", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Testimonials_1.default),
    __metadata("design:type", Array)
], User.prototype, "testimonials", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => AppointmentCancellation_1.default),
    __metadata("design:type", Array)
], User.prototype, "appointmentCancellations", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user',
        timestamps: true
    })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map