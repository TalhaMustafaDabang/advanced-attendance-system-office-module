import { Course } from './../../interfaces/Icourse';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { Degrees, coursesWithSemester } from './../../interfaces/Idegree';
import { Component, OnInit } from '@angular/core';
import { ModelsService } from 'src/app/services/models.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.css']
})
export class AddDegreeComponent implements OnInit {

  degreeToAdd={courses:[]} as Degrees;
  addDegreeForm: FormGroup;
  courses: Course[];
  constructor(private dbs: DatabaseServiceService,private ms: ModelsService){

    this.addDegreeForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.pattern('[a-zA-Z0-9-_&]+') ]),
      durationInMonths: new FormControl(null,[
        Validators.min(0),
        Validators.max(60)
      ]),
      semesters: new FormControl(null,[
        Validators.required,
        Validators.min(0),
        Validators.max(10),
      ]),
  });
  this.dbs.getCourses().subscribe((courses)=>{
    this.courses=courses;
  });
}

  ngOnInit() {
  }



  addDegree(value:any)
  {

    this.degreeToAdd.cou = {

    }

    let coursesWithSemester: {semester:number,offeredCourses: string[]}[]=new Array(value.semesters);

    for (let index = 0; index < value.semesters; index++) {

       coursesWithSemester[index]={semester: index+1,offeredCourses: []};
       let sem_name = 'Semester-'.concat((index+1).toString())
       Object.defineProperty(this.degreeToAdd.cou,sem_name,{value:[]});

    }

    console.log(this.degreeToAdd.cou);
    console.log(coursesWithSemester);

      this.courses.forEach(course=>{
        course.offeredTo.forEach(offeredTo=>{
          if(offeredTo.degree==value.title)
          {
            coursesWithSemester[offeredTo.semester-1].offeredCourses.push(course.title)
            let sem_name = 'Semester-'.concat((offeredTo.semester).toString())
            Object.defineProperty(this.degreeToAdd.cou[sem_name],course.title,{value:[]});
          }
        })
      });

console.log(this.degreeToAdd.cou);
      // this.degreeToAdd.cou= {};

    this.degreeToAdd.title=value.title;
    this.degreeToAdd.durationInMonths=value.durationInMonths;
    this.degreeToAdd.semesters=value.semesters;
  this.degreeToAdd.courses=coursesWithSemester;
    console.log(this.degreeToAdd);

    this.dbs.addDegree(this.degreeToAdd)
    .then((Degree)=>{
      console.log("added db response",Degree)
      // this.dbs.updateDegree(this.degreeToAdd.title,this.degreeToAdd.cou);



Swal.fire(
  'Done',
  `Degree ${this.degreeToAdd.title} added sucessfully!`,
  'success'
);
      console.log(`Degree ${this.degreeToAdd.title} added sucessfully!`);
      this.degreeToAdd={courses:[]} as Degrees;
    })
    .catch((err)=>{
      console.log(`Sorry, Degree ${this.degreeToAdd.title} is not added due to`,err)
      this.degreeToAdd={courses:[]} as Degrees;
    });
  }


  closeModal(){
    this.ms.closeModal();
  }



}
