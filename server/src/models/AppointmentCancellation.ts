import { Column, Table, Default, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Appointment from './Appointment';
import User from './User';

@Table({
    tableName: 'appointment_cancellation',
    timestamps: false
})

class AppointmentCancellation extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })

    declare appointmentCancellationId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare cancellation_reason : string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare additional_comments: string;

    @Default(new Date())
    @Column({
        type: DataType.DATE,
        allowNull: false
    })

    declare cancellation_date: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare createdAt: Date;

    // Foreign Key and Relation to Appointment (Uno a uno)
    @ForeignKey(() => Appointment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })

    declare appointmentId: number;

    @BelongsTo(() => Appointment)
    appointment: Appointment;

     // Relación muchos a uno con Client
     @ForeignKey(() => User)
     @Column({
         type: DataType.INTEGER,
         allowNull: false
     })
     declare userId: number;
 
     @BelongsTo(() => User)
     user: User;

}

export default AppointmentCancellation;