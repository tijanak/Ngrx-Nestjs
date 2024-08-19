import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ImageService } from './image.service';
import { AuctionDeletedEvent } from '../auction/auction.events';

@Injectable()
export class ImageListener {
  constructor(private readonly imageService: ImageService) {}

  @OnEvent('auction.deleted')
  async handleAuctionDeletedEvent(event: AuctionDeletedEvent) {
    for (const image of event.images) {
      await this.imageService.deleteFile(image.fileName);
    }
  }
}
