import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private users = [];
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash('changeme', salt).then((value) => {
        this.users.push({
          id: 1,
          name: 'john',
          surname: 'haha',
          email: 'john@email.com',
          password: value,
          phone_number: '123456',
          auctions: [],
          bids: [],
        });
      });
      bcrypt.hash('guess', salt).then((value) => {
        this.users.push({
          id: 2,
          name: 'maria',
          surname: 'kvaic',
          email: 'maria@email.com',
          password: value,
          phone_number: '123456',
          auctions: [],
          bids: [],
        });
      });
    });
  }
  async findOne(email: string): Promise<User | undefined> {
    //return this.userRepo.findOne({ where: [{ email: email }] });
    return this.users.find((user) => user.email === email);
  }
}
