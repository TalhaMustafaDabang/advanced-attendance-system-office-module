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

  // Key1 = "437b5edf675f4197933508001bd44932"; old

  Key1 = "a0644eb3014b46038a56e736a47bf37a";//new
  // Key 2: e09d95da9cee4fbea9ca0e392c7466f6 //new





  makeStudent(enrollId: string) {
    let endPointForCreatingStudent = this.Endpoint + "/persongroups/students/persons";


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Ocp-Apim-Subscription-Key': this.Key1

      })
    };
    return this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/students/persons", { "name": enrollId }, httpOptions)
  }


  train() {
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



  addFace(personId, imgUrl) {
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


  deletedPersonAndFace(personId: string) {

    let deletedApiUrl = `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/students/persons/${personId}`

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Ocp-Apim-Subscription-Key': this.Key1

      })
    };
    return this.http.delete(deletedApiUrl, httpOptions);


  }


}
