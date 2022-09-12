import { IsString, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";



export class UpdateCvDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    age: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    cin: number;

    @IsOptional()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;
}