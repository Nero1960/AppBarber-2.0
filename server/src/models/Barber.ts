import { Column, DataType, Default, HasMany, Model, Table } from 'sequelize-typescript';
import Appointment from './Appointment';

@Table({
    tableName: 'barber',
    timestamps: false
})

class Barber extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
      })
      declare barberId: number;

    @Column({
        type: DataType.STRING(),
        allowNull: false

    })

    declare name: string;

    @Column({
        type: DataType.STRING(),
        allowNull: false

    })

    declare lastname: string;

    @Column({
        type: DataType.STRING(),
        allowNull: true

    })

    declare phone: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    declare email: string;

    @Column({
        type : DataType.TEXT,
        allowNull: false
    })

    declare specialty : string;

    @Default('default.png')
    @Column({
        type: DataType.STRING(60),
        allowNull: true
    })

    declare image : string;

    @HasMany(() => Appointment)
    appointment: Appointment[]


}



export default Barber;