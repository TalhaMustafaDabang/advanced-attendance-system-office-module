import { StorageAzureService } from './services/storage-azure.service';
import { AuthServiceService } from './services/auth-service.service';
import { ModelsService } from './services/models.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { DegreesComponent } from './degrees/degrees.component';
import { AddDegreeComponent } from './degrees/add-degree/add-degree.component';
import { StudentsComponent } from './students/students.component';
import { AddStudentsComponent } from './students/add-students/add-students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AddTeacherComponent } from './teachers/add-teacher/add-teacher.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ClassesComponent } from './classes/classes.component';
import { AddClassComponent } from './classes/add-class/add-class.component';



import { AngularFireModule, FirebaseAuth, FirebaseApp, FirebaseFirestore } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routes } from './routing';
import { DatabaseServiceService } from './services/database-service.service';
import { ShowClassComponent } from './classes/show-class/show-class.component';
import { ShowTeacherComponent } from './teachers/show-teacher/show-teacher.component';
import * as firebase from 'firebase';

@NgModule({
  declarations: [
    AppComponent,
    SignInFormComponent,
    SignUpFormComponent,
    CoursesComponent,
    AddCourseComponent,
    DegreesComponent,
    AddDegreeComponent,
    StudentsComponent,
    AddStudentsComponent,
    TeachersComponent,
    AddTeacherComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ClassesComponent,
    AddClassComponent,
    ShowClassComponent,
    ShowTeacherComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    AngularFirestoreModule,
  ],
  exports:[ModalModule],
  providers: [ModelsService,DatabaseServiceService,AuthServiceService,StorageAzureService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(environment.firebase);
  }
}
