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
  path:'classs/:id',
  component: ShowClassComponent,

},
{
    path:'home',
    component: HomeComponent ,
},
{
    path:'sign-in',
    component: SignInFormComponent ,
},
{
    path:'sign-up',
    component: SignUpFormComponent ,
},
{
    path:'students',
    component: StudentsComponent ,
},
{
    path:'teachers',
    component: TeachersComponent ,
},
{
    path:'courses',
    component: CoursesComponent ,
},
{
    path:'degrees',
    component: DegreesComponent ,
},
{
    path:'classes',
    component: ClassesComponent  ,
},
{
    path: '',
    component: HomeComponent ,
},
{
    path: '**', redirectTo: 'home'
},
]
