import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";



export class AddCvDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    age: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    cin: number;

    @IsNotEmpty()
    @IsString()
    job: string;

    @IsOptional()
    @IsString()
    path: string;
}