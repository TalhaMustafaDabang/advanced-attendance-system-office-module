import { Class } from './../../interfaces/Iclass';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Students } from 'src/app/interfaces/Istudent';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})
export class ShowClassComponent implements OnInit {
  classes: Class;
  showClassInfo:boolean=true;
  editClassInfo:boolean=false;
  showClassStudents:boolean=false;
  students: Students[];

  constructor(private activatedRoute: ActivatedRoute,private dbs: DatabaseServiceService) {
    let classId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dbs.getClass(classId).subscribe((classes)=>{
      this.classes=classes;
      console.log(this.classes);
    });
    this.dbs.getStudentsByProperty('class',classId).subscribe((students)=>{this.students=students});
  }

  showClassInfoFunc(){
    this.showClassInfo=true;
    this.showClassStudents=false;
    this.editClassInfo=false;
  }
  editClassInfoFunc(){
    this.showClassInfo=false;
    this.showClassStudents=false;
    this.editClassInfo=true;
  }
  showClassStudentsFunc(){
    this.showClassInfo=false;
    this.showClassStudents=true;
    this.editClassInfo=false;
  }

  ngOnInit() {

  }


}
