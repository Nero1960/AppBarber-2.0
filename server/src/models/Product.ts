import { Column, Model, Table, DataType, BelongsToMany, HasOne, Default } from "sequelize-typescript";
import Cart from "./Cart";
import CartDetails from "./CartDetails";
import Inventory from "./Inventory";


@Table({
    tableName: 'product',
    timestamps: false
})

class Product extends Model {

    @Column({
        type: DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    declare productId: number;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.DOUBLE(5,2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('price');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    })
    declare price: number;

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    declare description: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    declare image: string;

    @Default(new Date())
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare createdAt: Date;

    @BelongsToMany(() => Cart, () => CartDetails)
    cart: Cart[];

    @HasOne(() => Inventory, { as: 'inventory'})
    inventory: Inventory;



}

export default Product;