import { Model, Column, BelongsTo, ForeignKey, Table, DataType, BelongsToMany, Default} from 'sequelize-typescript';
import User from './User';
import Product from './Product';
import CartDetails from './CartDetails';


@Table({
    tableName: 'cart',
    timestamps: false
})

class Cart extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare cartId: number;

    @Default(new Date())
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare date: Date;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user : User;

    @BelongsToMany(() => Product, () => CartDetails)
    product: Product[];

}

export default Cart;