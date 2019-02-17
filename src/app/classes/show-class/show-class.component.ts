import { Class } from './../../interfaces/Iclass';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private activatedRoute: ActivatedRoute,private dbs: DatabaseServiceService) {
    let classId = this.activatedRoute.snapshot.paramMap.get('id');
    this.dbs.getClass(classId).subscribe((classes)=>{
      this.classes=classes;
      console.log(this.classes);
    })
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
