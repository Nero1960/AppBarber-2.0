import { Column, Table, Default, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product';

@Table({
    tableName: 'inventory',
    timestamps: false
})
class Inventory extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare inventoryId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare last_updated: Date;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productId: number;

    @BelongsTo(() => Product)
    product: Product;
}

export default Inventory;