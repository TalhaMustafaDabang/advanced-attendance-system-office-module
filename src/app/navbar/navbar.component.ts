import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,public authS :AuthServiceService) { }

  ngOnInit() {
  }

  logout()
  {

    this.authS.logout().then((res)=>{
      localStorage.removeItem('user');
      this.router.navigate(['./sign-in']);
    })
  }

}
