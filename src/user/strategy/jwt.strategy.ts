import { UserEntity } from './../entities/user.entity';
import { PayloadInterface } from './../interface/payload-interface';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configServe: ConfigService,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configServe.get('JWT_SECRET'),
        });
    }

    async validate(payload: PayloadInterface) {
        const user = await this.userRepository.findOneBy({
            username: payload.username
        });

        if (!user) {
            throw new UnauthorizedException();
        }
        else {
            // const { password, salt, ...result } = user;
            delete user.salt;
            delete user.password;
            
            return user;
        }
    }
}
