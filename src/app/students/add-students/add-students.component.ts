import { StorageAzureService } from './../../services/storage-azure.service';
import { Course } from './../../interfaces/Icourse';
import { element } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelsService } from './../../services/models.service';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Degrees } from './../../interfaces/Idegree';
import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/interfaces/Iclass';
import { Students } from 'src/app/interfaces/Istudent';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  courses: Course[];
  classes: Class[];
  degrees: Degrees[];
  student: Students = {} as Students;
  studentsIds: string[] = new Array();
  addStudentForm: FormGroup;
  enrolId: string = '';
  classId: string = '';
  imageUrl: string = '';
  studentName: string = "";
  constructor(private dbs: DatabaseServiceService, private ms: ModelsService, private storageAzureService: StorageAzureService) {
    this.addStudentForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required]),
      lastName: new FormControl(null, [
        Validators.required]),
      fatherName: new FormControl(null, [
        Validators.required]),
      age: new FormControl(null, [
        Validators.required]),
      status: new FormControl(null, [
        Validators.required]),
      class: new FormControl(null, [
        Validators.required]),
      enrollmentId: new FormControl(null, [
        Validators.required]),
      // image: new FormControl(null, [Validators.required])
    })


    this.dbs.getClasses().subscribe((classes) => { this.classes = classes });
    this.dbs.getDegrees().subscribe((degrees) => { this.degrees = degrees });
    this.dbs.getStudents().subscribe((students) => { students.forEach((student) => { this.studentsIds.push(student.enrollmentId) }) });

  }

  ngOnInit() {
  }

  //executed first automatically (3)
  uploadImage(event: any) {
    console.log("1");
    let file = event.target.files[0];
    let blob = file.slice(0, file.size, 'image/png');
    let newFile = new File([blob], this.enrolId, { type: 'image/png' });


    if (this.studentsIds.indexOf(this.enrolId) == -1) {
      this.storageAzureService.uploadImage(newFile, { 'id': this.enrolId, 'cls': this.classId }).then((e) => { console.log(e); this.imageUrl = e; this.student.imageId = e; this.createStudent() }).catch((e) => { console.log(e) });
    }
    else {
      alert(`Sorry, Enrollment Id ${this.enrolId} already exits in records, try again with a new one please`!)
    }

  }


  //called from upload image (2)
  createStudent() {
    this.storageAzureService.makeStudent(this.enrolId).toPromise().then((personId) => {

      console.log('Student Added Successfully!');
      this.student.personId = <string>personId;
      console.log(personId, this.student.personId);
      this.storageAzureService.addFace(personId, this.imageUrl).toPromise().then((presistedFaceId) => {
        console.log('Face Added Successfully! ', presistedFaceId);
        this.storageAzureService.train().toPromise().then((res) => {
          console.log('Trained Successfully!', res)
        }).catch((e) => { });

      }).catch((e) => { });
    })
      .catch(e => { })
  }


  //will be triggered on button click event which will be enablled after the 2 step completes.
  addStudent(value: any) {
    if (this.studentsIds.indexOf(value.enrollmentId) == -1) {
      this.student.age = value.age;
      this.student.class = value.class;
      this.student.enrollmentId = value.enrollmentId;
      this.student.fatherName = value.fatherName;
      this.student.firstName = value.firstName;
      this.student.lastName = value.lastName;
      this.student.status = value.status;

      this.dbs.addStudents(this.student).then((student) => {
        console.log("got this student",student);
        this.makeAttendanceDoc();



        console.log(`Student ${value.enrollmentId} added sucessfully!`)
      })
        .catch((err) => {
          alert(`Sorry, there is a error: ${err} while adding student ${value.enrollmentId}, try again!`)
        })
    }
    else {
      alert(`Sorry, Enrollment Id ${value.enrollmentId} already exits in records, try again with a new one please`!)
    }
  }

  closeModal() {
    this.ms.closeModal();
  }


  //will be called after student is added from database from add student
  makeAttendanceDoc() {

    let semesterWithCourses = {};

    let obj = {
      id: this.student.enrollmentId,
    }

    this.classes.forEach((element) => {
      if (element.id == this.student.class) {
        this.degrees.forEach((degree) => {
          if (degree.title == element.degree) {
            console.log(degree);
            console.log("IN", degree.cou);
            semesterWithCourses = degree.cou;
          }
        })
      }
    });

    console.log(semesterWithCourses);

    this.dbs.makeStudentAttendance(this.student.enrollmentId, semesterWithCourses)
      .then((res) => {
        console.log(res);

        Swal.fire(
          'Done',
          `Student ${this.student.enrollmentId} added sucessfully!`,
          'success'
        );


        this.student = {} as Students;
      })
      .catch((e) => { alert(e) });

  }








}
