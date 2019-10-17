import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../Interfaces/info-pagina.service';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;

  constructor(
    private _http: HttpClient
  ) {

    this._http.get('assets/data/data-pagina.json')
        .subscribe((resp: InfoPagina) =>{
          console.log(resp);
          this.cargada = true;
          this.info = resp;
        })

   }
}
