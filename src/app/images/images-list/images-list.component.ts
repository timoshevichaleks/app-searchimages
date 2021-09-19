import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { delay } from "rxjs/operators";
import { Photo } from "../models/photo";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  photos: Photo[] = [];
  keyword: string;
  totalLength: number;
  page: number = 1;
  lastKeyword: string;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
  }

  search(event: any) {
    this.keyword = event.target.value.toLowerCase().trim();
    if (this.keyword && this.keyword.length > 2 && this.keyword != this.lastKeyword) {
      this.imagesService.getImages(this.keyword)
        .pipe(delay(2000))
        .subscribe((res: Photo[]) => {
          this.photos = res;
          this.totalLength = res.length;
        })
      this.lastKeyword = this.keyword;
    }
  }

}
