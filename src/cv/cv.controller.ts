import { UpdateCvDto } from './../dto/update-cv.dto';
import { AddCvDto } from './../dto/add-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.gard';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';

@Controller('cv')
export class CvController {
    constructor(
        private cvService: CvService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCvs(@User() user: object): Promise<CvEntity[]> {
        return await this.cvService.getCvs(user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addCvs(
        @Body() cv: AddCvDto,
        @User() user: object
    ): Promise<CvEntity> {
        return await this.cvService.addCvs(cv, user);
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    async updateCvs(
        @Body() cv: UpdateCvDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity> {
        return await this.cvService.updateCvs(cv, id);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async soldRemoveCv(
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity> {
        return await this.cvService.softRemoveCv(id);
    }
}
