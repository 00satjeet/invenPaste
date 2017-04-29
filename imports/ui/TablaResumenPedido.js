import {Meteor} from 'meteor/meteor';
import React from 'react';
import Select from 'react-select';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Proveedores} from '../api/proveedores';
import {Productos} from '../api/productos';

import PrivateHeader from './PrivateHeader';

import moment from 'moment';
// console.log("hola",this.state.productos);
// console.log("holaaaa",this.state.productos[z]);
// console.log("numero de cajas",this.state.productos[z].cantidadUnitariaPedido);

export default class TablaResumenPedido extends React.Component{
  constructor(props){
    super(props);
    this.state={
      nombreProducto:'',
      llamado:false,
      nombreProveedor:'',
      cantidadUnitaria:'',
      _idProveedor:'',
      lastUpdate:'',
      prueba:'',
      IsOpen:false,
      error:'',
      proveedores: [],
      productos: [],
      precioPedido:'',

    };
  }
  componentDidMount(){
    this.proveedoresTraker=Tracker.autorun(()=>{
      Meteor.subscribe('proveedores');
      const misProveedores=Proveedores.find({
        visible:true
      }).fetch();
      this.setState({proveedores:misProveedores});
      console.log('los proveedores que tengo son', misProveedores);

      Meteor.subscribe('productos');
      const misProductos=Productos.find({
        visible:true,
        // nombreProveedor:this.state.nombreProveedor
      }).fetch();
      this.setState({productos:misProductos});
      console.log('los productos que tengo son', misProductos);
      //seguidor de fecha  this.setState({
      this.setState({
        lastUpdate:Session.get('lastUpdate'),
        precioPedido:Session.get('precioPedido')
      })

    });
  }
  componentWillUnmount(){
    console.log('desmontando los links');

    this.proveedoresTraker.stop();
  }
  onSubmitPedido(e){
    const { productos} =this.state;
    e.preventDefault();
    var cantidadProductos=this.state.productos.length;
    console.log("cantidade de productos: "+ cantidadProductos);
    productos.map((producto)=>{
      if(producto.nombreProveedor==this.state.nombreProveedor){
        console.log("nombre de proveedores iguales");
        Meteor.call('productos.updatePedido',producto._id,producto.cantidadUnitariaPedido,(err,res)=>{
          if(!err){
            this.setState({IsOpen:false,llamado:true,error:''});
            console.log("guardando");
            Meteor.call('proveedores.updateFechaPedido',this.state._idProveedor,()=>{
              // setTimeout(()=>this.setState({guardado:false}),1000 );
              var fecha=Proveedores.findOne({_id:this.state._idProveedor}).modifiedAt;
              console.log("la fecha 2222"+fecha);
              Session.set('lastUpdate',fecha);
              this.setState({llamado:false,lastUpdate:fecha})
            });
          }else{
            this.setState({error:err.reason});
          }
        });
      }
    });

  }


  handleInputNumberChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : parseInt(target.value);
   const name = target.name;

   this.setState({
     [name]: value
   });
  }
  seteoProveedores(value){
    console.log("comprobando el valor de :" + value);

    this.state.proveedores.map((proveedor)=>{

        if(proveedor.nombreProveedor==value){
          console.log("cambiare la id");
          Session.set('lastUpdate',proveedor.modifiedAt);
          console.log('variable session lastupadte'+Session.get('lastUpdate'));
          this.setState({
              prueba:"algo",
              _idProveedor:proveedor._id,
              lastUpdate:proveedor.modifiedAt,
              [name]: value,
          },()=>{
            console.log(`nombre del proveedor , state:  ${this.state.nombreProveedor}`);
            console.log(`La Id del proveedor actual es:  ${this.state._idProveedor}`);
            this.precioPedido(this.state.nombreProveedor);
          }

        );
          // this.setState({lastUpdate:proveedor.modifiedAt});
          console.log(`nombre del proveedor , state: 1" ${this.state.nombreProveedor}`);
          setTimeout(()=>console.log(`nombre del proveedor , state 1seg despues:  ${this.state.nombreProveedor}`),1000 );
          setTimeout(()=>console.log(`La Id del proveedor actual es 1seg despues:  ${this.state._idProveedor}`),1000 );

          console.log("la fecha es 2 " +this.state.lastUpdate);
          console.log("la fecha es 3 " +typeof(this.state.lastUpdate));
          console.log("mi prueba de 4: " +(this.state.prueba));



        }else{
          console.log("no cambiare la id");

        }

    });
  }

  precioPedido(nombreProveedor){

    let precioTotal=0;
    console.log("precioPedido?"+nombreProveedor);
    // Session.set('precioPedido',precioTotal);
    console.log("precio Pedido actual: ?"+this.state.precioPedido);
    if(this.state.nombreProveedor){
      this.state.productos.map((producto,z)=>{
                             if(this.state.nombreProveedor==producto.nombreProveedor){
                               if(producto.esEnCaja){
                                 let pedidoCaja=Math.ceil(producto.cantidadUnitariaPedido / producto.unidadesXCaja);
                                 precioTotal+=producto.precioXCaja*pedidoCaja;
                               }else{
                                 precioTotal+=producto.precioUnitario*producto.cantidadUnitariaPedido;
                               }
                               
                               Session.set('precioPedido',precioTotal);
                               console.log("gola");
                             }
                           });
    }


  }

   handleInputStringChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
        [name]: value,
    },()=>{
      console.log("se var a setear los valores");
      this.seteoProveedores(value);
      console.log("se setearon los valores");

      }

    );



  }

    renderFecha(){

      let fecha=null;
      console.log("pasara?");
      if(this.state.lastUpdate){
        fecha=` La ultima fecha fue: ${this.state.lastUpdate}`;
        console.log("paso la prueba");
      }
      return (
        <h3 className="p__centrada"> {fecha}  </h3>
      );
    }




  render(){
    var fecha=`El ultimo guardado fue ${this.state.lastUpdate}`;

    return(
      <div>
        {this.state.error ? <p>{this.state.error}</p> :undefined }

          <h1 className="p__centrada">Tabla Resumen del Inventario</h1>
          {this.renderFecha()}
          <div  className='filita'>
            <div className="columna4">
              <select className="selectResumen"value={this.state.nombreProveedor} name="nombreProveedor" onChange={this.handleInputStringChange.bind(this)}>
                <option value="">Seleccione el proveedor</option>
                {
                  this.state.proveedores.map((proveedor)=>{
                    return (<option key= {proveedor._id}  value={proveedor.nombreProveedor}>{proveedor.nombreProveedor}</option>)
                  })
                }

              </select>
            </div>

            <div className="columna4 ">
              <p className="p--center">Pedido Cajas</p>

            </div>
            <div className="columna4 ">
              <p className="p--center">Pedido Unitario</p>

            </div>
            <div className="columna4 ">
              <p className="p--center">Fecha del inventario</p>
            </div>

          </div>


          {
            this.state.nombreProveedor ?
                                this.state.productos.map((producto,z)=>{

                                    if(this.state.nombreProveedor==producto.nombreProveedor){
                                      console.log("nombres iguales");
                                      let i=producto._id +49;
                                      let j=producto._id +50;
                                      let k=producto._id+51;
                                      let h=producto._id+52;
                                      let pedidoCajas=~~(producto.cantidadUnitariaPedido / producto.unidadesXCaja);
                                      let pedidoCajas2=Math.ceil(producto.cantidadUnitariaPedido / producto.unidadesXCaja);
                                      let pedidoUnitario;
                                      let fechaTemp=producto.modifiedAt.toString().split(' ',5);
                                      let fecha2=moment(producto.modifiedAt).format("D/MMMM - HH:mm");
                                      let fecha=`${fecha2}`;

                                      if(producto.esEnCaja){
                                        pedidoUnitario=`En caja: ${producto.unidadesXCaja*pedidoCajas2}`;
                                      }else{
                                        console.log("cantidadUnitariaPedido:  "+producto.cantidadUnitariaPedido);

                                        pedidoUnitario=producto.cantidadUnitariaPedido;
                                      }

                                      console.log("pedido de cajas:  "+pedidoCajas);
                                      console.log("pedido de cajas2:  "+pedidoCajas2);

                                      return (<div key={i} className='filaTabla'>
                                                <div className="columna4">
                                                  <p key={i}>{producto.nombreProducto}</p>
                                                </div>
                                                <div className="columna4">
                                                  <p key={h}>{pedidoCajas2}</p>
                                                </div>

                                                <div className="columna4">
                                                    <p key={j}>{pedidoUnitario}</p>
                                                </div>
                                                <div className="columna4">
                                                  <p key={j}>{fecha}</p>

                                                </div>

                                              </div>);
                                      // return (<option key= {proveedor._id}  value={proveedor.nombreProveedor}>{proveedor.nombreProveedor}</option>)
                                      // <button className="button button--round" onClick={() => {
                                      // Players.update(this.props.player._id, {$inc: {score: 1}});
                                      // }}>+1</button>
                                      //
                                      // this.setState((prevState) => ({
                                      //     productos[producto].cantidadUnidades: prevState.[producto].cantidadUnidades + 1
                                      //   }));
                                    }else{
                                      console.log("nombres distintos",this.state.nombreProveedor,producto.nombreProveedor);
                                    }
                                    })
                                  : <p> </p>
          }
          <div  className='filaTabla'>
            <form onSubmit={this.onSubmitPedido.bind(this)} className="boxed-view__form">
            <span className="button--disabled" > Dinero a gastar: {this.state.precioPedido}</span>

              <button className="button">{this.state.llamado ? <p>Proveedor  Llamado</p> :<p>Llamar Proveedor</p> } </button>
              <button type="button" className="button button--secondary"
                onClick={()=>this.setState({IsOpen:false, error:''})}
                > Cancelar </button>

            </form>
          </div>



      </div>
    );
  }
}
