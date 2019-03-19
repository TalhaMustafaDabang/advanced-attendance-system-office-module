import { ModelsService } from './../../services/models.service';
import { Course, offeredTo } from './../../interfaces/Icourse';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseToAdd={offeredTo:[]} as Course;
  addCourseForm: FormGroup;

  constructor(private dbs: DatabaseServiceService,private ms: ModelsService){

    this.addCourseForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.pattern('[a-zA-Z0-9-_&]+') ]),
      creditHours: new FormControl(null,[
        Validators.min(0),
        Validators.max(5)
      ]),
      totalClasses: new FormControl(null,[
        Validators.required,
        Validators.min(0),
      ]),
      offeredTo: new FormControl(null,[Validators.required]),

  });
}

  ngOnInit() {
  }



  addCourse(value:any)
  {

    let objs=value.offeredTo.split('.');
    objs.forEach(element => {
      this.courseToAdd.offeredTo.push({degree:element.split(',')[0],semester:<number>element.split(',')[1]})
    });
    this.courseToAdd.title=value.title;
    this.courseToAdd.creditHours=value.creditHours;
    this.courseToAdd.totalClasses=value.totalClasses;

    this.dbs.addCourse(this.courseToAdd)
    .then((course)=>{
Swal.fire(
  'Done',
  `Course ${this.courseToAdd.title} added sucessfully!`,
  'success'
);




      console.log(`Course ${this.courseToAdd.title} added sucessfully!`);
    this.courseToAdd={offeredTo:[]} as Course;
    objs=null;
    })
    .catch((err)=>{
    this.courseToAdd={offeredTo:[]} as Course;
    objs=null;
    console.log(`Sorry, course ${this.courseToAdd.title} is not added due to`,err)
  });

}


  closeModal(){
    this.ms.closeModal();
  }


}
