import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class ModelsService {
oldModalRef:BsModalRef;
modalRef:BsModalRef;
signInTemplate:HTMLInputElement;
constructor(public modalService: BsModalService) { }

openSigninMethod(){
 this.modalRef=this.modalService.show(this.signInTemplate);
 this.oldModalRef=this.modalRef;
}



openModal(template:HTMLInputElement)
{

  if(this.oldModalRef==null){
    this.signInTemplate=template;
    console.log("No Previous Modal Opened");
    this.modalRef=this.modalService.show(template);
    this.oldModalRef=this.modalRef;
    console.log(this.modalRef+" opened. And Old Model Is: "+this.oldModalRef);

  }
  else{

    this.oldModalRef.hide();
    console.log(this.oldModalRef+" is clolsed!");
    this.modalRef=this.modalService.show(template);
    this.oldModalRef=this.modalRef;
    console.log(this.modalRef+" opened. And Old Model Is: "+this.oldModalRef);

  }
}

closeModal(){
  this.oldModalRef.hide();
  this.oldModalRef=null;
}

}
