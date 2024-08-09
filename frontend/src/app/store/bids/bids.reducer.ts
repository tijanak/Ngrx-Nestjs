import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { IBid } from '@org/models';

export interface BidState extends EntityState<IBid> {
  error: HttpErrorResponse | null;
}
