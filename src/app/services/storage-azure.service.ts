import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageAzureService {

  constructor(public http: HttpClient, public fireStorage: AngularFireStorage) { }


  Endpoint = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";

  Key1 = "93acf35265184dfa8d2d4a0b75b949e7";

  Key2 = "db8d697a7fe04dd1b62872bc36e6dba5";






  makeStudent(enrollId: string) {
    let endPointForCreatingStudent = this.Endpoint + "/persongroups/students/persons";


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Ocp-Apim-Subscription-Key': this.Key1

      })
    };
   return this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/students/persons", { "name": enrollId }, httpOptions);

  }


  train()
  {
    let endPointForTraining = this.Endpoint + `/persongroups/students/train`;


    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Ocp-Apim-Subscription-Key': this.Key1

      })
    };
   return this.http.post(endPointForTraining, {}, httpOptions);
  }



  addFace(personId,imgUrl){
    let endPointForAddingFace = this.Endpoint + `/persongroups/students/persons/${personId}/persistedFaces`;


    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Ocp-Apim-Subscription-Key': this.Key1

      })
    };
   return this.http.post(endPointForAddingFace, { "url": imgUrl }, httpOptions);

  }




  uploadImage(file: File, info: any): Promise<any> {

    return new Promise((res, rej) => {


      let task = this.fireStorage.ref(`${info.cls}/${info.id}`)
        .put(file)
        .then((file) => {

          file.ref.getDownloadURL().then((e) => {
            console.log(e);
            res(e);

          });

        })
        .catch((e) => {
          rej(e.message);
          alert(e.message);
        });

    });
  }


}
