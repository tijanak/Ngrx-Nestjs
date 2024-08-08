import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { IImage } from "@org/models";

export const uploadImages=createAction('[Images] Upload',
    props<{images:File[],event:string}>())
export const uploadImagesSuccess=createAction('[Images] Upload Success',
    props<{images:IImage[],event:string}>()
)

export const uploadImagesFailure=
 createAction('[Images] Upload Failure',
    props<{error:HttpErrorResponse,event:string}>()
 )