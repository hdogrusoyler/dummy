import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { GuardGuard } from './guard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Role } from './model';
import { PostComponent } from './post/post.component';
import { CommentResolver, PostResolver } from './resolver.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'posts', component: PostComponent, resolve:{postresolver:PostResolver} },
  { path: 'comments/:postId', component: CommentComponent, resolve:{commentresolver:CommentResolver} },
  // { path: 'comments', component: CommentComponent, resolve:{commentresolver:CommentResolver} },
  { path: 'admin', component: AdminComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin] }},
  { path: 'login', component: LoginComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[PostResolver, CommentResolver]
})
export class AppRoutingModule { }
