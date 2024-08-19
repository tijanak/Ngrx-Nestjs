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

  createForAuction(imageDto: CreateImageDto, auctionId: number) {
    const image = this.imageRepo.create({
      fileName: imageDto.fileName,
      auction: { id: auctionId },
    });
    return this.imageRepo.save(image, {});
  }
  async findImagesByAuctionId(auctionId: number): Promise<Image[]> {
    const images = await this.imageRepo.find({
      where: { auction: { id: auctionId } },
      relations: ['auction'],
    });

    return images;
  }
  async deleteFile(filename: string) {
    const filePath = path.join(imagesPath, filename);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(
          `Slika ${filename} nije pronadjena u folderu`
        );
      }
      throw error;
    }
  }
  async delete(id: number) {
    const image = await this.imageRepo.findOne({
      where: { id },
    });
    if (!image) {
      throw new NotFoundException(`Slika ne postoji.`);
    }
    const filename = image.fileName;
    await this.imageRepo.delete(image.id);

    //TODO - obrisi
    await this.deleteFile(filename);
  }
  async findImageWithAuctionOwner(imageId: number): Promise<Image | null> {
    return this.imageRepo.findOne({
      where: { id: imageId },
      relations: ['auction', 'auction.owner'],
    });
  }
}
