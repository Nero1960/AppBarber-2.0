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
const Barber_1 = __importDefault(require("./Barber"));
const User_1 = __importDefault(require("./User"));
const AppointmentService_1 = __importDefault(require("./AppointmentService"));
const Service_1 = __importDefault(require("./Service"));
const AppointmentCancellation_1 = __importDefault(require("./AppointmentCancellation"));
let Appointment = class Appointment extends sequelize_typescript_1.Model {
    services;
    // Relación uno a uno con AppointmentCancellation
    appointmentCancellation;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Appointment.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false
    }),
    __metadata("design:type", String)
], Appointment.prototype, "time", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('pending'),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Appointment.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default),
    __metadata("design:type", User_1.default)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Barber_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Appointment.prototype, "barberId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Barber_1.default),
    __metadata("design:type", Barber_1.default)
], Appointment.prototype, "barbero", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Service_1.default, () => AppointmentService_1.default),
    __metadata("design:type", Array)
], Appointment.prototype, "services", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => AppointmentCancellation_1.default),
    __metadata("design:type", AppointmentCancellation_1.default)
], Appointment.prototype, "appointmentCancellation", void 0);
Appointment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'appointment',
        timestamps: false
    })
], Appointment);
exports.default = Appointment;
//# sourceMappingURL=Appointment.js.map