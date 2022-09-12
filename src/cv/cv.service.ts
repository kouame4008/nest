import { UserEntity } from './../user/entities/user.entity';
import { AddCvDto } from './../dto/add-cv.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity';
import { UpdateCvDto } from 'src/dto/update-cv.dto';
import { userRoleEnum } from 'src/generic/user-role.enum';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) { }

    async getCvs(user: any): Promise<CvEntity[]> {
        const { id, role } = user;
        if (role == userRoleEnum.ADMIN)
           return await this.cvRepository.find();

        const listeCv = this.cvRepository.createQueryBuilder("cv")
            .where("cv.user = :user", { user: id })
            .getMany()

        return listeCv;
    }

    async addCvs(cv: AddCvDto, user: any): Promise<CvEntity> {
        const newCv = this.cvRepository.create(cv);
        newCv.user = user;
        return await this.cvRepository.save(newCv);
    }

    async updateCvs(cv: UpdateCvDto, id: number): Promise<CvEntity> {
        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        });

        if (!newCv)
            throw new NotFoundException(`Le CV d'Id ${id} n'existe pas !`);

        return await this.cvRepository.save(newCv);
    }

    async softRemoveCv(id: number) {
        const cvRemove = await this.cvRepository.findOneBy({ id });

        if (!cvRemove)
            throw new NotFoundException(`Le CV d'Id ${id} n'existe pas !`);

        return this.cvRepository.softRemove(cvRemove)
    }
}
