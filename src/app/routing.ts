import { ShowAttendanceComponent } from './show-attendance/show-attendance.component';
import { ShowTeacherComponent } from './teachers/show-teacher/show-teacher.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ShowClassComponent } from './classes/show-class/show-class.component';
import { NgModule } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { DegreesComponent } from './degrees/degrees.component';
import { ClassesComponent } from './classes/classes.component';



export const routes: Routes =
[
    {
        path:'attendance/:id',
        component: ShowAttendanceComponent,
        canActivate: [AuthGuardService],

      },
{
  path:'classs/:id',
  component: ShowClassComponent,
  canActivate: [AuthGuardService],

},
{
  path:'teacher/:id',
  component: ShowTeacherComponent,
  canActivate: [AuthGuardService],

},

{
    path:'home',
    component: HomeComponent ,
    canActivate: [AuthGuardService],
},
{
    path:'sign-in',
    component: SignInFormComponent ,
},
{
    path:'sign-up',
    component: SignUpFormComponent ,
    canActivate: [AuthGuardService],
},
{
    path:'students',
    component: StudentsComponent ,
    canActivate: [AuthGuardService],
},
{
    path:'teachers',
    component: TeachersComponent ,
    canActivate: [AuthGuardService],
},
{
    path:'courses',
    component: CoursesComponent ,
    canActivate: [AuthGuardService],
},
{
    path:'degrees',
    component: DegreesComponent ,
    canActivate: [AuthGuardService],
},

{
    path:'classes',
    component: ClassesComponent  ,
    canActivate: [AuthGuardService],
},
{
    path: '',
    component: HomeComponent ,
    canActivate: [AuthGuardService],
},
{
    path: '**', redirectTo: 'home',
    canActivate: [AuthGuardService],
},
]
