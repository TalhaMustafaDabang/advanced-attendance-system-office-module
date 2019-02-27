import { async } from '@angular/core/testing';
import { Class } from './../interfaces/Iclass';
import { Degrees } from './../interfaces/Idegree';
import { Course } from './../interfaces/Icourse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ArrayType } from '@angular/compiler';
import { Students } from '../interfaces/Istudent';
import { Teacher } from '../interfaces/Iteacher';

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

  private teachersCollection: AngularFirestoreCollection<Teacher>;
  teachers: Observable<Teacher[]>;
  private teacherDoc: AngularFirestoreDocument<Teacher>;
  teacher: Observable<Teacher>;



  constructor(private afs: AngularFirestore) {

    this.teachersCollection= this.afs.collection('Teachers');
    this.teachers=this.teachersCollection.valueChanges();


    this.coursesCollection=afs.collection('Courses');
    this.courses=this.coursesCollection.valueChanges();

    this.degreesCollection=afs.collection('Degrees');
    this.degrees=this.degreesCollection.valueChanges();

    this.studentsCollection=afs.collection('Students');
    this.students=this.studentsCollection.valueChanges();

    this.classesCollection=afs.collection('Classes');
    this.classes=this.classesCollection.valueChanges();



  }

  getTeacherById(id:string)
  {
    this.teacherDoc=this.afs.doc<Teacher>(`Teachers/${id}`);
    this.teacher=this.teacherDoc.valueChanges();
    return this.teacher;
  }

  addTeacher(teacher:Teacher):Promise<any>
  {
    return new Promise((res,rej)=>{
      this.teachersCollection.doc(teacher.id).set(teacher).then((teacher)=>{
        res(teacher);
      })
      .catch((err)=>{
        rej(err);
      })
    })
  }

  getTeachers(){
    this.teachers=this.teachersCollection.valueChanges();
    return this.teachers;
  }

  updateTeacher(id:string,teacher:Teacher):Promise<any>{
    return new Promise((res,rej)=>{
        this.teacherDoc=this.afs.doc<Teacher>(`Teachers/${id}`);
        this.teacherDoc.update(teacher).then((teacher)=>{
          res(teacher);
        })
        .catch((err)=>{
          rej(err);
        })
    });
  }





  getStudentsByProperty(property:string,classId:string)
  {
    let queryStudentsCollection: AngularFirestoreCollection<Students>;
    queryStudentsCollection = this.afs.collection('Students', ref => ref.where(property,'==',classId));
    let studentsOfQuery = queryStudentsCollection.valueChanges();
    return studentsOfQuery;
  }


  addStudents(student: Students):Promise<any>
  {
   return new Promise((resolve,reject)=>{
      this.studentsCollection.doc(student.enrollmentId).set(student)
    .then((student)=>{resolve (student)})
    .catch((err)=>{console.log(err);reject (err)})

    })

  }


  getStudents(){
    this.students=this.studentsCollection.valueChanges();
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
    this.courses=this.coursesCollection.valueChanges();
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
