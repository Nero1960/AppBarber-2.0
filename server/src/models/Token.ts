import { Model, Column,  Table, DataType, BelongsTo, Default, ForeignKey} from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'token',
    timestamps: false
})

class Token extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    declare tokenId : number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare token : string

    @Default(new Date())
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare createdAt: Date;
    
    @Default(new Date(new Date().getTime() + 10 * 60 * 1000)) // 10 minutos en el futuro
    @Column({
        type: DataType.DATE,
    })
    declare expiresAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

}


export default Token;