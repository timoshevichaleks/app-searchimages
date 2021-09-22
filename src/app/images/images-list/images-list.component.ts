import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  photos$: Observable<Photo[]>;
  length: Observable<number>;
  page = new BehaviorSubject<number>(1);
  pageSize = new BehaviorSubject<number>(12)
  searchControl: FormControl = new FormControl();

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.photos$ = combineLatest([this.page, this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ), this.pageSize])
      .pipe(
        switchMap(([pageNumber, searchValue, pageSize]): Observable<Photo[]> => {
          if (searchValue.length >= 1 && searchValue.trim()) {
            return this.imagesService.getImages(searchValue, pageNumber, pageSize)
          } else {
            return of([])
          }
        })
      )

    this.length = this.imagesService.totalPhoto;
  }

  onPageChanged(event: PageEvent) {
    this.page.next(event.pageIndex + 1);
    this.pageSize.next(event.pageSize);
  }

  savePhoto(photo: Photo): void {
    this.imagesService.saveImages(photo)
  }
}
