import { EntityRepository , Repository } from "typeorm";
import { user } from "./user.entity";

@EntityRepository(user)
export class UsersRepository extends Repository<user> {
    
}