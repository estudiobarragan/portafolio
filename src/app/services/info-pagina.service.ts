import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../Interfaces/info-pagina.interface';
import { InfoEquipo } from '../Interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;
  equipo: InfoEquipo[] = [];

  constructor(
      private _http: HttpClient
    ) {
      this.cargarInfo();
      this.cargarEquipo();
   }
   
  private cargarInfo(){
    this._http.get('assets/data/data-pagina.json')
        .subscribe((resp: InfoPagina) =>{
          this.cargada = true;
          this.info = resp;
    })
  }

  private cargarEquipo(){
    this._http.get('https://portfolio-82abf.firebaseio.com/Equipo.json')
        .subscribe((resp: InfoEquipo[]) =>{
          this.cargada = true;
          this.equipo = resp;
    })
  }
}
