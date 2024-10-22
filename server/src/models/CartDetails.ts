import { Table, DataType, Model, BelongsTo, Column, ForeignKey, Default } from 'sequelize-typescript';
import Product from './Product';
import Cart from './Cart';

@Table({
    tableName: 'cart_details',
    timestamps: false
})

class CartDetails extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare cart_detailsId: number;

    @Default(1)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('quantity');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    })
    declare quantity : number;

    @Default(0)
    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('discount');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    })
    declare discount: number;

    @Default(0)
    @Column({
        type: DataType.DECIMAL(6, 2),
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('subtotal');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    })
    declare subtotal: number;

    @Column({
        type: DataType.DECIMAL(5, 2),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('unit_price');
            return rawValue !== null ? parseFloat(rawValue) : null;
        }
    })
    declare unit_price: number;

    //Relación Producto
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productId: number;

    @BelongsTo(() => Product)
    declare product: Product;

    //Relación Carrito
    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare cartId: number;

    @BelongsTo(() => Cart)
    declare cart: Cart;
}

export default CartDetails;