import { ThrowStmt } from "@angular/compiler";
import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Producto } from "./negocio/modelos/producto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-tienda';

  tableColumnsstock: string[] = ['Cod.', 'Descripcion','Precio','PrecioCantidad','Accion'];
  lista = new MatTableDataSource<any>();
  listaProductos = new Array<Producto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  total : number
  producto: Producto = new Producto();
  cantidad : number
  
  constructor(){
    this.total = 0;

  }

  limpiarCarrito(){
    this.lista.data = []
    this.listaProductos = []
    this.actualizarTotal();
  }

  actualizarCantidad(registro: Producto,event){
    registro.cantidad = event.target.value
    registro.precioCantidad = registro.precioBase*registro.cantidad
    this.listaProductos[this.listaProductos.indexOf(registro)]=registro
    this.actualizarTotal();
    this.lista.data = this.listaProductos
  }

  actualizarTotal(){
      this.total = 0;
      for(let cursor of this.listaProductos){
        this.total += cursor.precioCantidad;
      }

  }

  agregar(producto:number){
    let productoNuevo = new Producto();
    productoNuevo.cantidad = 1;
    switch(producto){
      case 0:
        productoNuevo.descripcion = "Papa"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 50
      break;
      case 1:
        productoNuevo.descripcion = "Acelga"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 100
      break;
      case 2:
        productoNuevo.descripcion = "Remolacha"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 150
      break;
      case 3:
        productoNuevo.descripcion = "Zanahoria"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 200
      break;
      case 4:
        productoNuevo.descripcion = "Lechuga"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 250
      break;
      case 5:
        productoNuevo.descripcion = "Batata"
        productoNuevo.precioCantidad= productoNuevo.precioBase = 300
      break;
    }
    this.listaProductos.push(productoNuevo);
    this.actualizarTotal();
    this.lista.data = this.listaProductos
  }

  sumar(registro:Producto){
    registro.cantidad++;
    registro.precioCantidad = registro.precioBase*registro.cantidad
    this.listaProductos[this.listaProductos.indexOf(registro)]=registro
    this.actualizarTotal();
    this.lista.data = this.listaProductos
  }

  restar(registro:Producto){
    if(registro.cantidad > 1){
      registro.cantidad--
      registro.precioCantidad = registro.precioBase*registro.cantidad
      this.listaProductos[this.listaProductos.indexOf(registro)]=registro
      this.actualizarTotal();
      this.lista.data = this.listaProductos
    }

  }

  borrar(registro:Producto){
    this.listaProductos.splice(this.listaProductos.indexOf(registro),1)
    this.actualizarTotal();
    this.lista.data=this.listaProductos
  }
}
