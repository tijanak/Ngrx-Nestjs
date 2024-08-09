import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { map, of, scan, switchMap } from 'rxjs';
import { ImageService, imagesPath } from './image.service';
import { Image } from './image.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImageService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
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
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nisu poslati fajlovi.');
    }

    try {
      const images = await Promise.all(
        files.map((file) =>
          this.imageService.create({ fileName: file.filename })
        )
      );

      return images;
    } catch (error) {
      throw new BadRequestException('Greska u procesuiranju fajlova.');
    }
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
