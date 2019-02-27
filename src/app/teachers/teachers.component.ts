import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../interfaces/Iteacher';
import { DatabaseServiceService } from '../services/database-service.service';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private dbs: DatabaseServiceService,private ms: ModelsService, private router: Router){
    this.dbs.getTeachers().subscribe((teachers)=>{
      this.teachers=teachers;
    });

  }

  ngOnInit() {
  }

  openFormModal(template:HTMLInputElement){
    this.ms.openModal(template);
  }


  openClassesInfoPage(teacher:Teacher){
    this.router.navigate(['teacher/',teacher.id]);
  }



}
