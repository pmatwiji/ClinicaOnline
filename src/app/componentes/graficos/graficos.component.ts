import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges  } from '@angular/core';
import * as Highcharts from 'highcharts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  @Input() grafico;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() descargar: EventEmitter<any> = new EventEmitter();

  ngOnChanges() {
    Highcharts.chart('graficos', this.grafico);
  }

  descargarArchivo(modo:string) {
    this.descargar.emit(modo);
  }


  constructor() { }

  ngOnInit(): void {
    
  }

  

}
