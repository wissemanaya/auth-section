import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UsersRepository ,
    ){}
    async signUp(authCredentialsDto:AuthCredentialsDto): Promise <void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
