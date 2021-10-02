import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post, Role } from './model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  baseUrl:string='https://jsonplaceholder.typicode.com';

  getPost(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(this.baseUrl + '/posts');
  }

  getComment(id:number): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(this.baseUrl + '/posts/' + id + '/comments');
  }

  TOKEN_KEY = 'token';

  logIn(log:any){
    if(log.user == 'a' && log.password == 'a'){
      this.saveToken(Role.Admin)
      return true;
    }else if (log.user == 'u' && log.password == 'u') {
      this.saveToken(Role.User)
      return true;
    } else {
      return false;
    }
  }

  saveToken(token:any) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return this.token != null;
  }
  
}
