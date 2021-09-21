import { Component, OnInit } from '@angular/core';
import { ImagesService } from "../images.service";
import { Photo } from "../models/photo";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable, pipe } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  photos$: Observable<Photo[]>;
  length: number = 500;
  pageIndex: number;
  page = new BehaviorSubject<number>(1);
  pageEvent: PageEvent;
  searchControl: FormControl = new FormControl();

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.photos$ = combineLatest([this.page, this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )])
      .pipe(
        switchMap(([pageNumber, searchValue]) => this.imagesService.getImages(searchValue, pageNumber))
      )
  }

  onPageChanged(event: PageEvent) {
    this.page.next(event.pageIndex + 1);
  }
}
