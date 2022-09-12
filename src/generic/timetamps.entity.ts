import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class TimeTampsEntitie {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}