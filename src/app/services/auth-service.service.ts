import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/Iuser';
import * as firebase from 'firebase';
import { FirebaseAuth } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

user: firebase.User;
  constructor(private router: Router, private afAuth: AngularFireAuth) {

    afAuth.authState.subscribe((user)=>{
      if(user){
        this.user=user;
        localStorage.setItem('user',JSON.stringify(user));
      }
      else{
        this.user=null;
        localStorage.setItem('user',null);
      }
    })

  }


  login(email: string, password: string) {
    console.log(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  loggedIn():boolean{
    return JSON.parse(localStorage.getItem('user'))!=null;
  }

  signup(user: IUser, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(user.email,password)
    .then((user)=>{
      console.log("s l i",user);
    })
    .catch((err)=>{
      alert(`err ${err}`);
    })

  }


  getCurrentState() {
    return this.user;
  }




   getCurrentUser()
   {
     return this.user;
   }





}
