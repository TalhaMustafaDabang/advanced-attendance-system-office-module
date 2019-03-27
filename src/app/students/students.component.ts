import { StorageAzureService } from './../services/storage-azure.service';
import { Students } from './../interfaces/Istudent';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { ModelsService } from '../services/models.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  addStudentForm: FormGroup;
  students: Students[];
  selectedStudnet: Students;
  constructor(private router: Router,private sas: StorageAzureService, private dbs: DatabaseServiceService, private ms: ModelsService) {

    dbs.getStudents().subscribe((students) => {
      this.students = students;
    });

  }

  ngOnInit() {
  }

  showAttendance(id:string){
    this.ms.closeModal();
    this.router.navigate(['attendance/',id]);
  }

  delete(studentId: string) {
    this.dbs.deleteDoc('Students', studentId)
      .then((e) => {


        this.sas.deletedPersonAndFace(this.students[this.students.findIndex(e => e.enrollmentId == studentId)].personId)
          .toPromise().then((e) => {

            Swal.fire(
              'Deleted',
              `Student ${studentId} deleted sucessfully!`,
              'success'
            );
          })
          .catch(e=>{alert(e)});

      })
      .catch(e => { alert(e) });
  }


  openStudentInfoModal(template: HTMLInputElement, student: Students) {
    this.selectedStudnet = student;
    this.ms.openModal(template);
  }


  openFormModal(template: HTMLInputElement) {
    this.ms.openModal(template);
  }


}
