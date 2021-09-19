import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { PhotoResponse } from "./models/photo-response";
import { Observable } from "rxjs";
import { PhotoPagination } from "./models/photo-pagination";
import { Photo } from "./models/photo";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  getImages(keyword: string): Observable<Photo[]> {
    const params = new HttpParams()
      .set('api_key', `${environment.key}`)
      .set('text', keyword)
      .set('format', 'json')
      .set('nojsoncallback', '1')
      .set('per_page', '500')

    return this.http.get<PhotoPagination>(environment.api, {params}).pipe(
      map((res) => {
      return res.photos.photo.map((ph: PhotoResponse) => {
        const url = `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`;
        const title = ph.title;
        return {...ph, url, title};
      });
    }))
  }

}
