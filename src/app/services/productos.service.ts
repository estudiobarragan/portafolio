import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/producto.interface';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(
    private _http: HttpClient
  ) {
    this.cargarProductos();
   }

  private cargarProductos(){
    return new Promise( (resolve, reject) => {
      this._http.get('https://portfolio-82abf.firebaseio.com/productos_idx.json')
          .subscribe((resp: Producto[])=>{
            this.cargando=false;
            this.productos = resp;
            resolve();
            // Si se quiere meter una demora para ver el loading
            /* setTimeout(() => {
              this.cargando=false;
            }, 1000); */
          });
    })
  }

  getProducto(id:string){
    return this._http.get(`https://portfolio-82abf.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){
    if( this.productos.length === 0){
      this.cargarProductos().then( ()=> {
        this.filtrarProductos(termino);
      })
    }else{
      this.filtrarProductos(termino);
    }
  }
  
  private filtrarProductos( termino: string){
    this.productosFiltrado=[];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0 ){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
