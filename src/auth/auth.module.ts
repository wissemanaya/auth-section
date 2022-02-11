import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import {UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),      //strategy of jwt
    JwtModule.register({                                      // configuration jwt     *** that model expert a service we can use in auth service *** 
      secret: 'topSecret51',                                     // key of signature 
      signOptions: {                                             //expiration time 
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],          //make it avialable within the module 
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}