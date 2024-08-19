import {
  EventSubscriber,
  EntitySubscriberInterface,
  RemoveEvent,
} from 'typeorm';
import { Image } from '../image.entity';
import { ImageService } from '../image.service';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ImageSubscriber implements EntitySubscriberInterface<Image> {
  constructor(private readonly imageService: ImageService) {}

  listenTo() {
    return Image;
  }

  async afterRemove(event: RemoveEvent<Image>) {
    if (event.entity) {
      Logger.log('Removing ', event.entity.fileName);
      await this.imageService.deleteFile(event.entity.fileName);
    } else {
      Logger.warn('Event entity is undefined');
    }
  }
}
