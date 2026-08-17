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
const Cart_1 = __importDefault(require("./Cart"));
const CartDetails_1 = __importDefault(require("./CartDetails"));
const Inventory_1 = __importDefault(require("./Inventory"));
let Product = class Product extends sequelize_typescript_1.Model {
    cart;
    inventory;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Product.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(45),
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE(5, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('price');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(45),
        allowNull: false
    }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(new Date()),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Cart_1.default, () => CartDetails_1.default),
    __metadata("design:type", Array)
], Product.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Inventory_1.default, { as: 'inventory' }),
    __metadata("design:type", Inventory_1.default)
], Product.prototype, "inventory", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'product',
        timestamps: false
    })
], Product);
exports.default = Product;
//# sourceMappingURL=Product.js.map