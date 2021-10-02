import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dummy';

  constructor(
    private servis:ServiceService,
    private router: Router,
    ){}
  get isUserAuthenticated():boolean {
    return this.servis.isAuthenticated;
  }

  onLogout() {
    this.servis.logOut();
    if(!this.isUserAuthenticated){
      this.router.navigateByUrl('/');
    };
  }
}
