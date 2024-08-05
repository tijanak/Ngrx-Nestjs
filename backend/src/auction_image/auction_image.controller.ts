import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { promises as fs } from 'fs';

@Controller('images')
export class ImagesController {
  private readonly imagesFolder = 'public/images';

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../', this.imagesFolder, filename);

    try {
      await fs.access(filePath);

      res.sendFile(filePath);
    } catch (error) {
      Logger.log(error);
      throw new NotFoundException('Image not found');
    }
  }
}
