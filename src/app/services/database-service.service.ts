import { Class } from './../interfaces/Iclass';
import { Degrees } from './../interfaces/Idegree';
import { Course } from './../interfaces/Icourse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ArrayType } from '@angular/compiler';
import { Students } from '../interfaces/Istudent';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  private coursesCollection : AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;

  private degreesCollection : AngularFirestoreCollection<Degrees>;
  degrees: Observable<Degrees[]>;

  private studentsCollection : AngularFirestoreCollection<Students>;
  students: Observable<Students[]>;

  private classesCollection : AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;
  private classDoc : AngularFirestoreDocument<Class>;
  class: Observable<Class>;

  constructor(private afs: AngularFirestore) {
    this.coursesCollection=afs.collection('Courses');
    this.courses=this.coursesCollection.valueChanges();

    this.degreesCollection=afs.collection('Degrees');
    this.degrees=this.degreesCollection.valueChanges();

    this.studentsCollection=afs.collection('Students');
    this.students=this.studentsCollection.valueChanges();

    this.classesCollection=afs.collection('Classes');
    this.classes=this.classesCollection.valueChanges();



  }


  addStudents(student: Students):Promise<any>
  {
   return new Promise((resolve,reject)=>{
      this.coursesCollection.doc(student.enrollmentId).set(student)
    .then((student)=>{resolve (student)})
    .catch((err)=>{console.log(err);reject (err)})

    })

  }


  getStudents(){
    return this.students;
  }


  addCalss(classes: Class):Promise<any>
  {
   return new Promise((resolve,reject)=>{
      this.classesCollection.doc(classes.id).set(classes)
    .then((classes)=>{resolve (classes)})
    .catch((err)=>{console.log(err);reject (err)})

    })

    }


  getClasses(){
    this.classes=this.classesCollection.valueChanges();
    return this.classes;
  }

  getClass(classId:string)
  {

    this.classDoc=this.afs.doc<Class>(`Classes/${classId}`);
    this.class=this.classDoc.valueChanges();
    return this.class;

  }


  addCourse(course:Course):Promise<any>
  {
   return new Promise((resolve,reject)=>{
      this.coursesCollection.doc(course.title).set(course)
    .then((course)=>{resolve (course)})
    .catch((err)=>{console.log(err);reject (err)})

    })

    }


  getCourses(){
    return this.courses;
  }



  addDegree(degree:Degrees):Promise<any>
  {
   return new Promise((resolve,reject)=>{
      this.degreesCollection.doc(degree.title).set(degree)
    .then((degree)=>{resolve (degree)})
    .catch((err)=>{console.log(err);reject (err)})

    })

    }


  getDegrees(){
    this.degrees=this.degreesCollection.valueChanges()
    return this.degrees;
  }




}
