import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/of';




@Injectable()
export class AuthService {

  user$:Observable<firebase.User>;

  constructor(
    private afAuth:AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService
  ) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.router.navigate[('/')];
  }
  
  logout(){
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser>{
    return this.user$
    .switchMap(user=> {
      if(user) return this.userService.get(user.uid);

      return Observable.of(null);
    });
  }
}
