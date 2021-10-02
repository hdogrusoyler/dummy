import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      console.log(data)
    });
    this.activatedRoute.params.subscribe(params => {
      this.getComments(params['postId']);
    });
  }

  comments: Array<Comment>=[];

  getComments(id:number){
    this.service.getComment(id).subscribe(result => {
      this.comments = result;
    })
  }

  displayedColumns: string[] = ['id','name', 'body', 'email', 'postId'];

}
