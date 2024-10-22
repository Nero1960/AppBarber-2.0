import { Model, Column, BelongsTo, ForeignKey, Table, DataType, BelongsToMany, Default, HasOne} from 'sequelize-typescript';
import Barber from './Barber';
import User from './User';
import AppointmentService from './AppointmentService';
import Service from './Service';
import AppointmentCancellation from './AppointmentCancellation';

@Table({
    tableName: 'appointment',
    timestamps: false
})

class Appointment extends Model {
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })

    declare appointmentId : number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })

    declare date : Date;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })

    declare time : string;

    @Default('pending')
    @Column({
        type: DataType.STRING,
        allowNull:false
    })

    declare status: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare createdAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number

    @BelongsTo(() => User)
    declare user : User

    
    @ForeignKey(() => Barber)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare barberId : number

    @BelongsTo(() => Barber)
    declare barbero : Barber;

    @BelongsToMany(() => Service, () => AppointmentService)
    services: Service[];

     // Relación uno a uno con AppointmentCancellation
     @HasOne(() => AppointmentCancellation)
     appointmentCancellation: AppointmentCancellation;

}




export default Appointment;