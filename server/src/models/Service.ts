import {  Column, Model, Table, DataType , BelongsToMany} from "sequelize-typescript";
import AppointmentService from "./AppointmentService";
import Appointment from "./Appointment";

@Table({
    tableName: 'service',
    timestamps: false
})


class Service extends Model {
    @Column({
        type: DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })

    declare serviceId : number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })

    declare name : string;

    @Column({
        type: DataType.DOUBLE(5,6),
        allowNull: false
    })

    declare price : number

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare createdAt: Date;

    @BelongsToMany(() => Appointment, () => AppointmentService)
    appointment: Appointment[];

}


export default Service;
