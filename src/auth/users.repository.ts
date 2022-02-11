import { EntityRepository, Repository } from 'typeorm';
import { user } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(user)
export class UsersRepository extends Repository<user> {
  //define a new user
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.hash(); // to save a crypted password in a database
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == '23505') {
        // if ther is a duplicate username
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      
    }
  }
}
