import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)          //sprcify entity user
export class UsersRepository extends Repository<User> {
  //define a new user
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    //to save a crypted password in a database
    const salt = await bcrypt.genSalt();             // generate a salt helps us to make every hashed password unique in database
    const hashedPassword = await bcrypt.hash(password, salt);  // generate a hashed password with salt that we generat 
    const user = this.create({ username, password: hashedPassword }); // create user 
    try {
      await this.save(user);            // store hashed pasword not really real password 
    } catch (error) {
      if (error.code == '23505') {
        // if their is a duplicate username
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      
    }
  }
}
