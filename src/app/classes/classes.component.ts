import Swal from 'sweetalert2';
import { DatabaseServiceService } from 'src/app/services/database-service.service';
import { FormGroup } from '@angular/forms';
import { ModelsService } from './../services/models.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Class } from '../interfaces/Iclass';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  addClassForm:FormGroup;
  classes:Class[];
  selectedClass: Class;
  constructor(private routes: ActivatedRoute,private router: Router,private dbs:DatabaseServiceService,private ms: ModelsService) {

    dbs.getClasses().subscribe((classes)=>{
      this.classes=classes;
    });

  }

  ngOnInit() {
  }

  openClassesInfoModal(template:HTMLInputElement,classes: Class)
  {
    this.router.navigate(['/classs',classes.id  ])

    // this.router.navigate(['/classs',{ queryParams: { id: classes.id } }])
    // this.selectedClass=classes;
    // this.ms.openModal(template);
  }

  delete(classId:string)
  {
    this.dbs.deleteDoc('Classes',classId)
    .then((e)=>{

Swal.fire(
  'Deleted',
  `Class ${classId} deleted sucessfully!`,
  'success'
);
    })
    .catch(e=>{alert(e)});
  }

  openFormModal(template:HTMLInputElement)
  {
    this.ms.openModal(template);
  }

}
