import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../Interfaces/producto-descripcion.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion ={};
  id: string;

  constructor(
    private route: ActivatedRoute,
    public _productoService: ProductosService
  ) { }

  ngOnInit() {
    this.route.params
        .subscribe(parametros=>{
          this._productoService.getProducto(parametros['id'])
              .subscribe( (producto: ProductoDescripcion) =>{
                this.producto=producto;
                this.id = parametros['id'];
              })
        })
  }

}
