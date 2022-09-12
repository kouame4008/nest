import { LoginCredentialDto } from './dto/login-credential.dto';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Body, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { UserSubscrireDto } from './dto/user-subscrire.dto';
import { UserEntity } from './entities/user.entity';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async register(
        @Body() newUser: UserSubscrireDto
    ): Promise<Partial<UserEntity>> {
        return this.userService.subscibe(newUser);
    }

    @Post('login')
    async login(
        @Body() credentials: LoginCredentialDto
    ) {
        return this.userService.login(credentials);
    }
}
