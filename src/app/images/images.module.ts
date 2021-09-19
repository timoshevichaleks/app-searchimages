import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesListComponent } from './images-list/images-list.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { NgxPaginationModule } from "ngx-pagination";



@NgModule({
	declarations: [
		ImagesListComponent,
  BookmarksComponent
	],
	exports: [
		ImagesListComponent
	],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    NgxPaginationModule
  ]
})
export class ImagesModule { }
