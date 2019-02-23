import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelsService } from './../../services/models.service';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Degrees } from './../../interfaces/Idegree';
import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/interfaces/Iclass';
import { Students } from 'src/app/interfaces/Istudent';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  classes: Class[];
  degrees: Degrees[];
  student: Students = {} as Students;
  studentsIds: string[] = new Array();
  addStudentForm: FormGroup;
  constructor(private dbs: DatabaseServiceService, private ms: ModelsService) {
    this.addStudentForm = new FormGroup({
      firstName: new FormControl(null,[
        Validators.required]),
      lastName:  new FormControl(null,[
        Validators.required]) ,
      fatherName:  new FormControl(null,[
        Validators.required]),
      age:  new FormControl(null,[
        Validators.required]),
      status: new FormControl(null,[
        Validators.required]),
      class: new FormControl(null,[
        Validators.required]),
      enrollmentId: new FormControl(null,[
        Validators.required]),
    })


    this.dbs.getClasses().subscribe((classes)=>{this.classes=classes});
    this.dbs.getDegrees().subscribe((degrees)=>{this.degrees=degrees});
    this.dbs.getStudents().subscribe((students)=>{students.forEach((student)=>{this.studentsIds.push(student.enrollmentId)})});

  }

  ngOnInit() {
  }


  addStudent(value:any)
  {
    if(this.studentsIds.indexOf(value.enrollmentId)==-1)
    {
      this.student.age=value.age;
      this.student.class=value.class;
      this.student.enrollmentId=value.enrollmentId;
      this.student.fatherName=value.fatherName;
      this.student.firstName=value.firstName;
      this.student.lastName=value.lastName;
      this.student.status=value.status;

      this.dbs.addStudents(this.student).then((student)=>{
        this.student = {} as Students;
        console.log(`Student ${value.enrollmentId} added sucessfully!`)
      })
      .catch((err)=>{
        alert(`Sorry, there is a error: ${err} while adding student ${value.enrollmentId}, try again!`)
      })
    }
    else{
      alert(`Sorry, Enrollment Id ${value.enrollmentId} already exits in records, try again with a new one please`!)
    }
  }

    closeModal(){
      this.ms.closeModal();
    }

}
