import { Degrees } from './../interfaces/Idegree';
import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.css']
})
export class DegreesComponent implements OnInit {
  degrees: Degrees[];
  selectedDegree: Degrees;
  constructor(private dbs: DatabaseServiceService, private ms: ModelsService){
  this.dbs.getDegrees().subscribe((degrees)=>{
    this.degrees=degrees;
    });


  }

  openModal(template: HTMLInputElement){
    this.ms.openModal(template);
  }

  ngOnInit() {

  }


  closeModal(){
    this.ms.closeModal();
  }

  openDegreeDetailsModal(template:HTMLInputElement,degree:Degrees)
  {
    this.selectedDegree=degree;
    this.ms.openModal(template);
  }
}
