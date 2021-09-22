import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  photos$: Observable<Photo[]>

  constructor(public imagesService: ImagesService) {
  }

  ngOnInit(): void {

    this.photos$ = this.imagesService.getSaveImages()
      .pipe(map((res: any) => {
        return Object.keys(res).map(key => {
          return {key, ...res[key]}
        })
      }))

  }

  deletePhoto(photo: Photo): void {
    this.imagesService.delete(photo).pipe(first()).subscribe(
      () => {
        this.photos$ = this.imagesService.getSaveImages()
          .pipe(
            map((res: any) => {
                return Object.keys(res).map(key => {
                  return {key, ...res[key]}
                })
              }
            )
          )
      }
    )
  }

}
