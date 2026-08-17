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
const Service_1 = __importDefault(require("./Service"));
const Appointment_1 = __importDefault(require("./Appointment"));
let AppointmentService = class AppointmentService extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], AppointmentService.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Appointment_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], AppointmentService.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Appointment_1.default),
    __metadata("design:type", Appointment_1.default)
], AppointmentService.prototype, "appointment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Service_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], AppointmentService.prototype, "serviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Service_1.default),
    __metadata("design:type", Service_1.default)
], AppointmentService.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE(5, 2),
        allowNull: false
    }),
    __metadata("design:type", Number)
], AppointmentService.prototype, "current_price", void 0);
AppointmentService = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'appointment_service',
        timestamps: false
    })
], AppointmentService);
exports.default = AppointmentService;
//# sourceMappingURL=AppointmentService.js.map