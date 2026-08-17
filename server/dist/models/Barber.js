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
let Barber = class Barber extends sequelize_typescript_1.Model {
    appointment;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Barber.prototype, "barberId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false
    }),
    __metadata("design:type", String)
], Barber.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: false
    }),
    __metadata("design:type", String)
], Barber.prototype, "lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        allowNull: true
    }),
    __metadata("design:type", String)
], Barber.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false
    }),
    __metadata("design:type", String)
], Barber.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], Barber.prototype, "specialty", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)('default.png'),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: true
    }),
    __metadata("design:type", String)
], Barber.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Appointment_1.default),
    __metadata("design:type", Array)
], Barber.prototype, "appointment", void 0);
Barber = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'barber',
        timestamps: false
    })
], Barber);
exports.default = Barber;
//# sourceMappingURL=Barber.js.map