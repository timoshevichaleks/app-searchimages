import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  photos: Photo[];

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.photos = this.imagesService.photos;
  }

  deletePhoto(photo: Photo): void {
    this.imagesService.delete(photo);
  }

}
