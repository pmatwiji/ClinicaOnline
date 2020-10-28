import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

  time: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  hourStep = 1;
  minuteStep = 30;



}
