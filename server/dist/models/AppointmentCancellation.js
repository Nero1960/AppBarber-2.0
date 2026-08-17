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
const User_1 = __importDefault(require("./User"));
let AppointmentCancellation = class AppointmentCancellation extends sequelize_typescript_1.Model {
    appointment;
    user;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], AppointmentCancellation.prototype, "appointmentCancellationId", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(""),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], AppointmentCancellation.prototype, "cancellation_reason", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], AppointmentCancellation.prototype, "additional_comments", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(new Date()),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], AppointmentCancellation.prototype, "cancellation_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(new Date()),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], AppointmentCancellation.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Appointment_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], AppointmentCancellation.prototype, "appointmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Appointment_1.default),
    __metadata("design:type", Appointment_1.default)
], AppointmentCancellation.prototype, "appointment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], AppointmentCancellation.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default),
    __metadata("design:type", User_1.default)
], AppointmentCancellation.prototype, "user", void 0);
AppointmentCancellation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'appointment_cancellation',
        timestamps: false
    })
], AppointmentCancellation);
exports.default = AppointmentCancellation;
//# sourceMappingURL=AppointmentCancellation.js.map