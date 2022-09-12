import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail } from "class-validator";
import { Type } from "class-transformer";

export class UserSubscrireDto {
    @IsNotEmpty ()
    @IsString ()
    username: string;

    @IsEmail ()
    @IsNotEmpty ()
    email: string;

    @IsString ()
    @IsNotEmpty ()
    password: string;
}