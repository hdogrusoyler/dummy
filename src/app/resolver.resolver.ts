import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comment, Post } from './model';
import { ServiceService } from './service.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostResolver implements Resolve<any> {
  
  constructor(private service: ServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getPost().pipe(
      catchError((error) => {
        console.log(error);
         return of('Post Yok');
      }));
  }
}

@Injectable({
  providedIn: 'root'
})

export class CommentResolver implements Resolve<any> {
  
  constructor(private service: ServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getComment(route.params.postId).pipe(
      catchError((error) => {
        console.log(error);
         return of('Comment Yok');
      }));
  }
}
