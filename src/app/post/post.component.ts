import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((data) => {
      console.log(data);
    });
    this.getPosts();
  }

  posts: Array<Post> = [];
  postlist: Array<Post> = [];

  getPosts() {
    this.service.getPost().subscribe((result) => {
      this.posts = result;
      this.getPageEvent(this.pageEvent);
    });
  }
  displayedColumns: string[] = ['actions', 'id', 'title', 'body', 'userId'];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
  };
  length: number | undefined;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  // MatPaginator Output

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  getPageEvent(event: any) {
    const firstIndex = event.pageIndex * event.pageSize;
    const lastIndex = firstIndex + event.pageSize;
    this.postlist = this.posts.slice(firstIndex, lastIndex);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = this.posts.length;
  }
}
