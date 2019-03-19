import { Teacher, teachingCourses } from './../../interfaces/Iteacher';
import { DatabaseServiceService } from './../../services/database-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelsService } from 'src/app/services/models.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacherToAdd = { nowTeaching: [] } as Teacher;
  teachers: string[]=[];
  addTeacherForm: FormGroup;
  constructor(private dbs: DatabaseServiceService, private ms: ModelsService) {

    dbs.getTeachers().subscribe((teachers) => {
      teachers.forEach((teacher) => {
        this.teachers.push(teacher.id);
      })
    });

    this.addTeacherForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      dept: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });

  }

  addTeacher(value: any) {
    if (!this.teachers.includes(value.id)) {
      this.teacherToAdd.courses = [];
      this.teacherToAdd.nowTeaching = [];
      this.teacherToAdd.dept = value.dept;
      this.teacherToAdd.firstName = value.firstName;
      this.teacherToAdd.lastName = value.lastName;
      this.teacherToAdd.id = value.email;
      this.teacherToAdd.email=value.email;
      console.log(this.teacherToAdd)
      this.dbs.addTeacher(this.teacherToAdd).then((teacher) => {
        this.teacherToAdd=null;

        Swal.fire(
          'Done',
          `Added Successfully In Db!`,
          'success'
        );

        console.log('Added Successfully In Db!');
      })
        .catch((err) => {
          this.teacherToAdd=null;
          alert(` Sorry Error Occured, ${err}`);
        });
    }
    else {
      alert(`Sorry, Id ${value.id} is already exits in db, try again with a different id.`)
    }
  }


  ngOnInit() {
  }

  closeModal() {
    this.ms.closeModal();
  }

}
