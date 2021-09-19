import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  photos: Array<any> = [];
  keyword: string;
  totalLength: number;
  page: number = 1;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
  }

  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.imagesService.getImages(this.keyword)
        .subscribe((res: any) => {
          this.photos = res;
          this.totalLength = res.length;
          console.log(this.photos)
        })
    }
  }

}
