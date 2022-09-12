import { UserEntity } from './../../user/entities/user.entity';
import { TimeTampsEntitie } from './../../generic/timetamps.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('cv')
export class CvEntity extends TimeTampsEntitie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string;

    @ManyToOne (
        type => UserEntity,
        (user) => user.cvs,
        {
            cascade: true,
            eager: true,
            nullable : true
        }
    )
    user: UserEntity

}
