import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { Degrees, coursesWithSemester } from './../../interfaces/Idegree';
import { Component, OnInit } from '@angular/core';
import { ModelsService } from 'src/app/services/models.service';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.css']
})
export class AddDegreeComponent implements OnInit {

  degreeToAdd={courses:[]} as Degrees;
  addDegreeForm: FormGroup;

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
}

  ngOnInit() {
  }



  addDegree(value:any)
  {
    let coursesWithSemester: {semester:number,offeredCourses: string[]}[]=new Array(value.semester);

    for (let index = 0; index < value.semesters; index++) {

       coursesWithSemester[index]={semester: index+1,offeredCourses: []};

    }

    console.log(coursesWithSemester);

    setTimeout(()=>{    this.dbs.getCourses().subscribe((courses)=>{
      courses.forEach(course=>{
        course.offeredTo.forEach(offeredTo=>{
          if(offeredTo.degree===value.title)
          {
            // console.log(`course ${JSON.stringify(course)} with offered to ${offeredTo} to ${value.title} degree, bcoz ${offeredTo.degree} == ${value.title}`)
            coursesWithSemester[offeredTo.semester-1].offeredCourses.push(course.title)

          }
        })
      })
    });
},3000)
    this.degreeToAdd.title=value.title;
    this.degreeToAdd.durationInMonths=value.durationInMonths;
    this.degreeToAdd.semesters=value.semesters;
  this.degreeToAdd.courses=coursesWithSemester;
    console.log(this.degreeToAdd);

    this.dbs.addDegree(this.degreeToAdd)
    .then((Degree)=>{
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
