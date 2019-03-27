import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.css']
})
export class ShowAttendanceComponent implements OnInit {
  attendance:any[]=new Array();
  studentId:any;
  courses:any[]=new Array();
  constructor(private actRoute: ActivatedRoute,private afs: AngularFirestore) {
   this.studentId=this.actRoute.snapshot.paramMap.get('id');
    afs.doc(`Attendance/${this.studentId}`).get().toPromise().then((e)=>{
     console.log(e.data());
     Object.entries(e.data()).forEach(element => {
      this.attendance.push(element);
     });
   })
  }

  selectSemester(index:any)
  {
    // Object.keys(this.attendance[index]).forEach;
  }

  ngOnInit() {
  }

}
