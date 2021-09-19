import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Photo } from "./photo";
import { PhotosOutput } from "./photosoutput";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages(keyword: string): any {
    const params = `api_key=${environment.key}&text=${keyword}&format=json&nojsoncallback=1`;

    return this.http.get<any>(environment.api + params).pipe(map((res) => {
      const urlArr: PhotosOutput[] = [];
      res.photos.photo.forEach((ph: Photo) => {
        const photoObj: any = {
          url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }))
  }

}
