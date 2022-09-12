import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config ()

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register ({defaultStrategy : 'jwt'}),
    JwtModule.register ({secret: process.env.JWT_SECRET, signOptions: { expiresIn: '3600s' }})
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
