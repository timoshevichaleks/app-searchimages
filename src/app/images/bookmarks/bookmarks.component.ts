import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";
import { first, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  photos: Photo[];

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.imagesService.getSaveImages()
      .pipe(first())
      .subscribe(
        (res: { [key: string]: Photo }) => {
          this.setPhotos(res);
        }
      )
  }

  private setPhotos(result: { [key: string]: Photo }): void {
    this.photos = result ? Object.keys(result).map(key => {return {key, ...result[key]}}) : [];
  }

  deletePhoto(photo: Photo): void {
    this.imagesService.delete(photo)
      .pipe(
        switchMap((): Observable<{ [key: string]: Photo }> => {
          return this.imagesService.getSaveImages()
        }),
        first()
      )
      .subscribe(
        (res: { [key: string]: Photo }) => {
          this.setPhotos(res)
        }
      )
  }

}
