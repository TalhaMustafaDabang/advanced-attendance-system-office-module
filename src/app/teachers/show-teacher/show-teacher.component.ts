import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from './../../interfaces/Icourse';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Teacher } from './../../interfaces/Iteacher';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { Class } from 'src/app/interfaces/Iclass';

@Component({
  selector: 'app-show-teacher',
  templateUrl: './show-teacher.component.html',
  styleUrls: ['./show-teacher.component.css']
})
export class ShowTeacherComponent implements OnInit {
  teacher = { nowTeaching: [] } as Teacher;
  showTeacherInfo: boolean = true;
  addTeachingClasses: boolean = false;
  editTeacherInfo: boolean = false;
  classes: Class[];
  courses: Course[];
  addAddTeachingForm: FormGroup;
  constructor(
    private dbs: DatabaseServiceService,
    private activatedRoute: ActivatedRoute,
  ) {

    let teacherId = activatedRoute.snapshot.paramMap.get('id');
    this.dbs.getTeacherById(teacherId).subscribe((teacher) => {
      this.teacher = teacher;
    });


    this.dbs.getClasses().subscribe((classses => {
      this.classes = classses;
    }));


    this.dbs.getCourses().subscribe((courses => {
      this.courses = courses;
    }));

    this.addAddTeachingForm = new FormGroup({
      course: new FormControl(null, [Validators.required]),
      calls: new FormControl(null, [Validators.required]),
    });


  }

  ngOnInit() {
  }

  addAddTeachingFunc(value: any) {
    let obj = {
      course: value.course,
      calss: value.calls,
    };

    let teacher = { nowTeaching: [] } as Teacher;
    teacher = this.teacher;


    if (teacher.nowTeaching.length > 0) {
      teacher.nowTeaching.forEach((teach) => {
        if (teach.calss == obj.calss && teach.course == obj.course) {
          alert("Already Exists!");
        }
        else {
          teacher.nowTeaching.push(obj);

          this.dbs.updateTeacher(teacher.id, teacher).then((teacher) => {

          });
        }
      });
    }
    else {
      teacher.nowTeaching.push(obj);

      this.dbs.updateTeacher(teacher.id, teacher).then((teacher) => {

      });
    }


  }

  showTeacherInfoFunc() {
    this.showTeacherInfo = true;
    this.addTeachingClasses = false;
    this.editTeacherInfo = false;
  }
  editTeacherInfoFunc() {
    this.showTeacherInfo = false;
    this.addTeachingClasses = false;
    this.editTeacherInfo = true;

  }
  showTeacherCurrentClassesFunc() {
    this.showTeacherInfo = false;
    this.addTeachingClasses = true;
    this.editTeacherInfo = false;

  }

}
