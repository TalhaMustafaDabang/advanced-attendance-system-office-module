import { Students } from './../interfaces/Istudent';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { ModelsService } from '../services/models.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  addStudentForm:FormGroup;
  students:Students[];
  selectedStudnet: Students;
  constructor(private dbs:DatabaseServiceService,private ms: ModelsService) {

    dbs.getStudents().subscribe((students)=>{
      this.students=students;
    });

  }

  ngOnInit() {
  }

  delete(studentId:string)
  {
    this.dbs.deleteDoc('Students',studentId)
    .then((e)=>{

Swal.fire(
  'Deleted',
  `Student ${studentId} deleted sucessfully!`,
  'success'
);
    })
    .catch(e=>{alert(e)});
  }


  openStudentInfoModal(template:HTMLInputElement,student: Students)
  {
    this.selectedStudnet=student;
    this.ms.openModal(template);
  }


  openFormModal(template:HTMLInputElement)
  {
    this.ms.openModal(template);
  }


}
