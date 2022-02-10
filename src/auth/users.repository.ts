import { EntityRepository , Repository } from "typeorm";
import { user } from "./user.entity";
import {AuthCredentialsDto} from './dto/auth-credentials.dto'


@EntityRepository(user)
export class UsersRepository extends Repository<user> {
    //define a new user 
    async createUser(authCredentialsDto:AuthCredentialsDto): Promise <void>{
        const {username,password} = authCredentialsDto;
        const user = this.create({username,password});
        await this.save(user) ;

    }
}