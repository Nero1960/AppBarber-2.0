import { Table, DataType, Model, BelongsTo, Column, ForeignKey } from 'sequelize-typescript';
import Service from './Service';
import Appointment from './Appointment';

@Table({
    tableName: 'appointment_service',
    timestamps: false
})

class AppointmentService extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })

    declare id: number;

    @ForeignKey(() => Appointment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare appointmentId: number;

    @BelongsTo(() => Appointment)
    declare appointment: Appointment;

    @ForeignKey(() => Service)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare serviceId: number;

    @BelongsTo(() => Service)
    declare service: Service;

    @Column({
        type: DataType.DOUBLE(5,2),
        allowNull: false
    })

    declare current_price : number
}

export default AppointmentService;