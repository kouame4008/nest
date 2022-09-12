import { IsString, IsNotEmpty } from "class-validator";

export class AddTodoDto {
    @IsString ()
    @IsNotEmpty ()
    name: string;

    @IsString ()
    @IsNotEmpty ()
    description: string;
}