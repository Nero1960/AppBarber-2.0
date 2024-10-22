import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'testimonials',
    timestamps: false
})

class Testimonials extends Model{
    @Column({
        type: DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    })

    declare testimonialId : number;

    @Column({
        type: DataType.STRING,
        allowNull: false

    })

    declare message : string;

    @Default(new Date())
    @Column({
        type: DataType.DATE,
        allowNull: false
    })

    declare date : Date;

    @Column({
        type: DataType.STRING,
        allowNull: false

    })

    declare title : string;

    @Default('Pendiente')
    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare status : string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number

    @BelongsTo(() => User)
    declare user : User
}

export default Testimonials;