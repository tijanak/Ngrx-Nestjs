import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { CreateImageDto } from '@org/models';
import { InjectRepository } from '@nestjs/typeorm';
import path from 'path';
import * as fs from 'fs';
const imagesFolder = 'backend/public/images/';
export const imagesPath = path.join(__dirname, '../../', imagesFolder);
@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}
  create(imageDto: CreateImageDto) {
    const image = this.imageRepo.create(imageDto);
    return this.imageRepo.save(image);
  }

  async delete(filename: string) {
    const image = await this.imageRepo.findOne({
      where: { fileName: filename },
    });
    if (!image) {
      throw new NotFoundException(`Slika ${filename} ne postoji.`);
    }

    await this.imageRepo.delete(image.id);
    Logger.log('delete image ' + filename);

    const filePath = path.join(imagesPath, filename);
    try {
      await fs.promises.unlink(filePath);
      Logger.log(`Slika ${filename} obrisana.`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(
          `Slika ${filename} nije pronadjena u folderu`
        );
      }
      throw error;
    }
  }
}
