import { userRoleEnum } from './../../generic/user-role.enum';
import { CvEntity } from './../../cv/entities/cv.entity';
import { TimeTampsEntitie } from './../../generic/timetamps.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('user')
export class UserEntity extends TimeTampsEntitie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        type: 'enum',
        enum: userRoleEnum,
        default: userRoleEnum.USER
    })
    role: string;

    @OneToMany(
        type => CvEntity,
        (cv) => cv.user
    )
    cvs: CvEntity[]

}
