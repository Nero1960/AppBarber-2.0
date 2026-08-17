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
const Product_1 = __importDefault(require("./Product"));
const Cart_1 = __importDefault(require("./Cart"));
let CartDetails = class CartDetails extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "cart_detailsId", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(1),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('quantity');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(5, 2),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('discount');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(6, 2),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('subtotal');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(5, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('unit_price');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "unit_price", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Product_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Product_1.default),
    __metadata("design:type", Product_1.default)
], CartDetails.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Cart_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], CartDetails.prototype, "cartId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Cart_1.default),
    __metadata("design:type", Cart_1.default)
], CartDetails.prototype, "cart", void 0);
CartDetails = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cart_details',
        timestamps: false
    })
], CartDetails);
exports.default = CartDetails;
//# sourceMappingURL=CartDetails.js.map