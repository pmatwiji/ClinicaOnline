import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges  } from '@angular/core';
import { FirebaseService } from "../../servicios/firebase.service";
import { ArchivosService } from "../../servicios/archivos.service";
import * as Highcharts from 'highcharts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  listaTurnos;
  listaEspecialidades;
  listaProfesionales;
  series = [];
  grafico;
  opcion = "";
  opcionInforme = null;

  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  constructor(private firebaseService: FirebaseService,private archivosService:ArchivosService) { }

  ngOnInit(): void {
    this.firebaseService.traerHistorialTurnos().subscribe(datos => this.listaTurnos = datos)
    this.firebaseService.traerColeccion('especialidades').then(datos=>this.listaEspecialidades = datos)
    this.firebaseService.traerProfesionalesHabilitados().subscribe(datos => this.listaProfesionales = datos);
    console.log(this.listaProfesionales)
  }

  seleccionarOpcion(opcion){
    switch (opcion) {
      case 'opPorEspec':
        this.turnosPorEspecialidad()
      break;
      case 'turPorDia':
        this.turnosPorDia()
      break;
      case 'turPorMedico':
        this.turnosPorMedico()
      break;
      case 'diasPorMedico':
        this.medicosPorDias()
      break;
    
      default:
        break;
    }
  }

  options:any = {
    chart: {
      type: 'bar',
      backgroundColor: 'white',
      plotBackgroundColor: 'rgb(255, 255, 210)',
      plotShadow: true,
      plotBorderWidth: 1
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return Highcharts.format('cantidad', this.x)+ ": " + this.y;
      }
    },
    xAxis: {
      type: 'string',
      labels: {
        formatter: function() {
          
        }
      }
    },
    yAxis:{
      title:{
        text:""
      }
    },
    series: []//this.series 
  }


  ////////////////////////////////////////////////////////

  turnosPorEspecialidad() {
    this.options = {
      chart: {
        type: 'bar',
        backgroundColor: 'white',
        plotBackgroundColor: 'rgb(255, 255, 210)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      title: {
        text: 'Sample Scatter Plot'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return Highcharts.format('cantidad', this.x)+ ": " + this.y;
        }
      },
      xAxis: {
        type: 'string',
        labels: {
          formatter: function() {
            
          }
        }
      },
      yAxis:{
        title:{
          text:""
        }
      },
      series: []//this.series 
    };
    this.series = [];
    let turnosPorEspecialidad:number = 0;
    for (const especialidad of this.listaEspecialidades) {
      for (const turno of this.listaTurnos) {
        if(turno.especialidad == especialidad.nombre) {
          turnosPorEspecialidad++;
        }
      }
      this.series.push({name: especialidad.nombre, data: [turnosPorEspecialidad]});
      //console.log({name: especialidad.nombre, data: [turnosPorEspecialidad]});
      this.options.series = this.series;
      turnosPorEspecialidad = 0;
    }
    this.cargarTurnosPorEspecialidads();
  }

  cargarTurnosPorEspecialidads() {
    this.options.yAxis.title.text = "Cantidad de operaciones";
    this.options.title.text = "Operacion por especialidad";
    this.grafico = this.options;
  }


  /////////////////////////////////////////////////

  turnosPorDia() {
    this.options = {
      chart: {
        type: 'bar',
        backgroundColor: 'white',
        plotBackgroundColor: 'rgb(255, 255, 210)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      title: {
        text: 'Sample Scatter Plot'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return Highcharts.format('cantidad', this.x)+ ": " + this.y;
        }
      },
      xAxis: {
        type: 'string',
        labels: {
          formatter: function() {
            
          }
        }
      },
      yAxis:{
        title:{
          text:""
        }
      },
      series: []//this.series 
    };
    this.series = [];
    let turnosPorDia:number = 0;
    for (const diaDeLaSemana of this.dias) {
      for (const turno of this.listaTurnos) {
        let split = turno.fecha.split(' ');
        let dia = split[0];
        if(dia == diaDeLaSemana) {
          turnosPorDia++;
        }
      }
      this.series.push({name: diaDeLaSemana, data: [turnosPorDia]});
      //console.log({name: diaDeLaSemana, data: [turnosPorDia]});
      this.options.series = this.series;
      turnosPorDia = 0;
    }
    this.cargarTurnosPorDia();
  }

  cargarTurnosPorDia() {
    this.options.yAxis.title.text = "Cantidad de turnos";
    this.options.title.text = "Turnos por dia";
    this.grafico = this.options;
  }

  ////////////////////////////////////////////////////

  turnosPorMedico() {
    this.options = {
      chart: {
        type: 'bar',
        backgroundColor: 'white',
        plotBackgroundColor: 'rgb(255, 255, 210)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      title: {
        text: 'Sample Scatter Plot'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return Highcharts.format('cantidad', this.x)+ ": " + this.y;
        }
      },
      xAxis: {
        type: 'string',
        labels: {
          formatter: function() {
            
          }
        }
      },
      yAxis:{
        title:{
          text:""
        }
      },
      series: []//this.series 
    };
    this.series = [];
    this.opcion = "turnosPorMedico";
    let turnosPorProfesional:number = 0;
    for (const profesional of this.listaProfesionales) {
      for (const turno of this.listaTurnos) {
        let hoy = new Date().getDate();
        let split = turno.fecha.split(' ');
        let fecha = split[1];
        let diferenciaEnDias = hoy - fecha;
        if(diferenciaEnDias <= 7 && diferenciaEnDias >= 0) { 
          if(turno.especialista == profesional.nombre + ' ' + profesional.apellido) {
            turnosPorProfesional++;
          }
        }
      }
          
      this.series.push({name: profesional.nombre + ' ' + profesional.apellido, data: [turnosPorProfesional]});
      console.log({name: profesional.nombre + ' ' + profesional.apellido, data: [turnosPorProfesional]});
      this.options.series = this.series;
      turnosPorProfesional = 0;
    }
    this.cargarTurnosPorMedico();
  }

  cargarTurnosPorMedico() {
    this.options.yAxis.title.text = "Cantidad de turnos por medico en los ultimos 7 dias";
    this.options.title.text = "Cantidad de turnos por medico";
    this.grafico = this.options;
  }

  /////////////////////////////////////////////////

  medicosPorDias() {
    this.options = {
      chart: {
        type: 'bar',
        backgroundColor: 'white',
        plotBackgroundColor: 'rgb(255, 255, 210)',
        plotShadow: true,
        plotBorderWidth: 1
      },
      title: {
        text: 'Sample Scatter Plot'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return Highcharts.format('cantidad', this.x)+ ": " + this.y;
        }
      },
      xAxis: {
        type: 'string',
        labels: {
          formatter: function() {
            
          }
        }
      },
      yAxis:{
        title:{
          text:""
        }
      },
      series: []//this.series 
    }; 
    this.series = [];

    let profesionalesPorDia:number = 0;
    let diasTrabajados = [];
    let cantidadDias = 0;
 
    for (const diaDeLaSemana of this.dias) {
      for (const turno of this.listaTurnos) {
        if(turno.estado == 'completado'){
          
          let hoy = new Date().getDate();
          let split = turno.fecha.split(' ');
          let fecha = split[1];
          let fechaCompleta = split[0] + ' ' + split[1];
          let diferenciaEnDias = hoy - fecha;

          if(turno.fecha.includes(fechaCompleta)){
            if(diferenciaEnDias <= 7 && diferenciaEnDias >= 0) {
              if(!diasTrabajados.includes(turno.fecha)){
                diasTrabajados.push(turno.fecha)
                cantidadDias++
              }
            }
          }
        }  
      }
      

      this.series.push({name: diaDeLaSemana, data: [diasTrabajados.length]});
      //console.log({name: diaDeLaSemana, data: [profesionalesPorDia]});
      this.options.series = this.series;
    }
    this.cargarMedicosPorDias();
  }

  cargarMedicosPorDias() {
    this.options.yAxis.title.text = "Cantidad de medicos (ultima semana)";
    this.options.title.text = "Cantidad de medicos que atendieron por dia";
    this.grafico = this.options;
  }


  ///////////////////////////////////////////////////////

  agarrarDescargar(modo:string) {
    if(modo == "Excel") {
      switch(this.opcionInforme) {
        case "//":
          //this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Especialidad','Cant Operaciones'), 'Operaciones por especialidades');
          break;
        case "opPorEspec":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Especialidad','Cant Operaciones'), 'Operaciones por especialidades');
          break;
        case "turPorDia":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Dia','Cant Turnos'), 'Turnos por Dia');
          break;
        case "turPorMedico":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Medico','Cant Turnos'), 'Turnos por Medico');
          break;
        case "diasPorMedico":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Dia','Cant Medicos que Trabajaron'), 'Medicos por dia');
          break;
      }
    } else {
      this.descargarPDF();
    }
  
  }

  preparaParaDescargar(lista, name, nameData){
    return lista.map(dato=>{
      return {[name]:dato.name,[nameData]:dato.data[0]}
    })
  }

  descargarPDF(){
    let aux = [];
    let tittle
    switch(this.opcion){
      case '//':
        tittle =  '//';
        break;
      case 'turnosPorEspecialidad':
        tittle = 'Operaciones por especialidades';
        break;
      case 'turnosPorDia':
        tittle = 'Turnos por Dia';
        break;
      case 'turnosPorMedico':
          tittle = 'Turnos por Medico';
          break;
      case 'medicosPorDias':
        tittle = 'Medicos por dia';
        break;
    }

    var docDefinition = {
      content: [
        tittle,
        {  }
      ]
    };

    for(let serie of this.series)
    {
      aux.push({text: `${serie.name}: ${serie.data[0]}`})
    }

    docDefinition.content[1] = {ul : aux};

    console.log(docDefinition.content[1]);

    pdfMake.createPdf(docDefinition).open();
  }

}
