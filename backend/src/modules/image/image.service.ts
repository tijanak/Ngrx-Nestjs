import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { CreateImageDto } from '@org/models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}
  create(imageDto: CreateImageDto) {
    const image = this.imageRepo.create(imageDto);
    return this.imageRepo.save(image);
  }
}
