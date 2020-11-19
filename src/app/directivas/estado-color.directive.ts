import { Directive, ElementRef, HostListener, Input, OnInit ,AfterViewInit} from '@angular/core';

@Directive({
  selector: '[EstadoColor]'
})
export class EstadoColorDirective {

  
  constructor(public elementRef:ElementRef) { }

  @Input() set  EstadoColor(estado:string){
    
    switch (estado) {
      case 'completado':
        this.elementRef.nativeElement.classList.add("bg-success")
      break;
      case 'aceptado':
        this.elementRef.nativeElement.classList.add("bg-success")
      break;
       case 'pendiente':
         this.elementRef.nativeElement.classList.add("bg-info")
      break;
      case 'cancelado':
        this.elementRef.nativeElement.classList.add("bg-danger")
      break;
      default:
        break;
  }
    //this.elementRef.nativeElement.value = this.estado;

    
    


  }

  

  

    

    
 

}
