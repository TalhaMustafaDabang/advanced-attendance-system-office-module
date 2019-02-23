import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private authS: AuthServiceService, private router: Router) { }



  canActivate():boolean{
    if(!this.authS.loggedIn()){this.router.navigate(['/sign-in']);}
return this.authS.loggedIn();

  // return false;

  }

}
