import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  photos$: Observable<Photo[]>;
  totalLength: number;
  page: number = 1;
  searchControl: FormControl = new FormControl();

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.photos$ = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value: string) => this.imagesService.getImages(value))
      )
  }
}
