import { UserEntity } from './entities/user.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSubscrireDto } from './dto/user-subscrire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async subscibe(userData: UserSubscrireDto): Promise<Partial<UserEntity>> {
        const user = this.userRepository.create({ ...userData });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);

        try {
            await this.userRepository.save(user);
        } catch (e) {
            throw new ConflictException("Le username et le mot de passe doivent etre unique");
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password
        }
    }

    async login(credentials: LoginCredentialDto) {
        const { username, password } = credentials;

        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.username = :username or user.email = :username', { username })
            .getOne();

        if (!user)
            throw new NotFoundException("Ivalid Credentials !");

        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword == user.password) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            const jwt = this.jwtService.sign(payload);
            return {
                "accessToken": jwt
            }
        }
        else {
            throw new NotFoundException("Ivalid Credentials !");
        }

    }

}
