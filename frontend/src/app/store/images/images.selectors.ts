import { createSelector } from '@ngrx/store';
import { imageAdapter } from './images.reducer';
import { AppState } from '../app.reducer';
import { IImage } from '@org/models';

const { selectEntities, selectAll } = imageAdapter.getSelectors();
export const selectImageFeature = createSelector(
  (state: AppState) => state.image,
  (state) => state
);
export const selectImages = createSelector(selectImageFeature, selectAll);

export const selectImagesForAuction = (auctionId: number) =>
  createSelector(selectImages, (images: IImage[]) =>
    images.filter((image) => image.auction.id === auctionId)
  );
export const selectImageError = createSelector(
  selectImageFeature,
  (imageState) => imageState.error
);
