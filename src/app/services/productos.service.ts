import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];

  constructor(
    private _http: HttpClient
  ) {
    this.cargarProductos();
   }

  private cargarProductos(){
    this._http.get('https://portfolio-82abf.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[])=>{
          console.log(resp);
          this.cargando=false;
          this.productos = resp;
          // Si se quiere meter una demora para ver el loading
          /* setTimeout(() => {
            this.cargando=false;
          }, 1000); */
        });
  }
}
