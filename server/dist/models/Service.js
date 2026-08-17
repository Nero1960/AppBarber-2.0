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
const AppointmentService_1 = __importDefault(require("./AppointmentService"));
const Appointment_1 = __importDefault(require("./Appointment"));
let Service = class Service extends sequelize_typescript_1.Model {
    appointment;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Service.prototype, "serviceId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE(5, 2),
        allowNull: false
    }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(new Date()),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Appointment_1.default, () => AppointmentService_1.default),
    __metadata("design:type", Array)
], Service.prototype, "appointment", void 0);
Service = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'service',
        timestamps: false
    })
], Service);
exports.default = Service;
//# sourceMappingURL=Service.js.map