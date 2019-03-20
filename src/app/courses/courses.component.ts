import { DatabaseServiceService } from './../services/database-service.service';
import { Observable } from 'rxjs';
import { Course } from './../interfaces/Icourse';
import { Component, OnInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal/public_api';
import { ModelsService } from '../services/models.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers:[ModelsService,DatabaseServiceService],
})
export class CoursesComponent implements OnInit {
  courses:Course[];
  selectedCourse: Course;
  constructor(private dbs:DatabaseServiceService,private ms: ModelsService) {

    dbs.getCourses().subscribe((courses)=>{
      this.courses=courses;
    });

  }

  ngOnInit() {
  }

  openOfferedToModal(template:HTMLInputElement,course: Course)
  {
    this.selectedCourse=course;
    this.ms.openModal(template);
  }


  openFormModal(template:HTMLInputElement)
  {
    this.ms.openModal(template);
  }

  delete(courseId:string)
  {
    this.dbs.deleteDoc('Courses',courseId)
    .then((e)=>{

Swal.fire(
  'Deleted',
  `Course ${courseId} deleted sucessfully!`,
  'success'
);
    })
    .catch(e=>{alert(e)});
  }

  closeModal()
  {
    this.ms.closeModal();
  }



}
