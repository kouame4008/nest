import { IsString, IsNotEmpty } from "class-validator";

export class LoginCredentialDto {
    @IsNotEmpty ()
    @IsString ()
    username: string;

    @IsString ()
    @IsNotEmpty ()
    password: string;
}