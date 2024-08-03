import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, toIUser } from '@org/models';
import { validate } from 'class-validator';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  private async hashPassword(password: string): Promise<string> {
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(password, salt);
    return hashed;
  }
  async register(userCreateDto: CreateUserDto) {
    const user = this.userRepo.create(userCreateDto);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    user.password = await this.hashPassword(user.password);
    return this.userRepo.save(user);
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: [{ email: email }] });
  }
  async delete(id: number) {
    return this.userRepo.delete(id);
  }
}
