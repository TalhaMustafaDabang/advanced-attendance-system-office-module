import { ModelsService } from './../../services/models.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Degrees } from './../../interfaces/Idegree';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Component, OnInit } from '@angular/core';
import { Students } from 'src/app/interfaces/Istudent';
import { Class } from 'src/app/interfaces/Iclass';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  degrees:Degrees[];
  students:Students[];
  classToAdd = {} as Class;
  addClassForm: FormGroup;
  yearsEnrollment:number[]=[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2019,2020,2021,2022,2023,2024,2025,
                  2026,2027,2028,2029,2030]
  yearsPassingOut:number[]=[2019,2020,2021,2022,2023,2024,2025,
                  2026,2027,2028,2029,2030]
  semesters:number[];
  selectedDegree: Degrees;
  shifts:string[]=["Morning" , "Evening" , "Weekends" , "Night"];

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.degrees=[];
}

  constructor(private dbs: DatabaseServiceService,private ms: ModelsService){
    this.dbs.getDegrees().subscribe((degrees)=>{this.degrees=degrees});
    this.dbs.getStudents().subscribe((students)=>{this.students=students});
    console.log(this.degrees)

    this.addClassForm = new FormGroup({
      degree: new FormControl(null,[
        Validators.required,
        Validators.pattern('[a-zA-Z0-9-_&]+') ]),
      enrollmentYear: new FormControl(null,[
        Validators.min(2000),
        Validators.max(2030),
        Validators.required
      ]),
      passingOutYear: new FormControl(null,[
        Validators.min(2019),
        Validators.max(2030),
        Validators.required
      ]),
      status: new FormControl(null,[
        Validators.required,
        Validators.min(1),
      ]),
      shift: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      section: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(10)]),

  });

  }

  ngOnInit() {
  }

  getDegrees()
  {
    if(!this.degrees)
      {
        this.dbs.getDegrees().subscribe((degrees)=>{this.degrees=degrees});
      }
  }

  closeModal()
  {
    this.ms.closeModal();
  }

  addClass(value:any)
  {
    let id = (value.degree).concat('-').concat(value.enrollmentYear.toString()).concat('-').concat(value.shift).concat('-').concat(value.section);
    this.classToAdd.id=id;
    this.classToAdd.degree=value.degree;
    this.classToAdd.enrollmentYear=value.enrollmentYear;
    this.classToAdd.passingOutYear=value.passingOutYear;
    this.classToAdd.section=value.section;
    this.classToAdd.shift=value.shift;
    this.classToAdd.status=value.status;
    this.classToAdd.currentStudentsId=[];

    console.log(this.classToAdd);

    this.dbs.addCalss(this.classToAdd)
    .then((classes)=>{
Swal.fire(
  'Done',
  `Class ${this.classToAdd.id} added sucessfully!`,
  'success'
);
      console.log(`Class ${this.classToAdd.id} added sucessfully!`);
      this.classToAdd={} as Class;

    })
    .catch((err)=>{
      console.log(`Eorre  ${err} in adding Class ${this.classToAdd.id}!`);
      this.classToAdd={} as Class;
    })
  }

}
