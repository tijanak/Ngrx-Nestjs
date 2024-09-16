import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { OwnerGuard } from '../auction/guards/owner.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ImageDeleteGuard } from './guards/delete.guard';
import { ImageService, imagesPath } from './image.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImageService) {}
  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = imagesPath;
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${Date.now()}_${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Samo slike su dozvoljene'), false);
        }
        cb(null, true);
      },
    })
  )
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nisu poslati fajlovi.');
    }

    try {
      const images = await Promise.all(
        files.map((file) =>
          this.imageService.createForAuction({ fileName: file.filename }, id)
        )
      );

      return images;
    } catch (error) {
      throw new BadRequestException('Greska u procesuiranju fajlova.');
    }
  }
  @UseGuards(JwtAuthGuard, ImageDeleteGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.delete(id);
  }
  @Get('auction/:id')
  async getForAuction(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findImagesByAuctionId(id);
  }
  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(imagesPath, filename);

    try {
      await fs.promises.access(filePath);

      res.sendFile(filePath);
    } catch (error) {
      Logger.log(error);
      throw new NotFoundException('Slika nije pronadjena');
    }
  }
}
