import {Meteor} from 'meteor/meteor';
import React from 'react';
// import Modal from 'react-modal';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import {Tracker} from 'meteor/tracker';
import {Proveedores} from '../api/proveedores';
import {Productos} from '../api/productos';

import PrivateHeader from './PrivateHeader';


export default class IngresoInventario extends React.Component{
  constructor(props){
    super(props);
    this.state={
      nombreProducto:'',
      marca:'',
      nombreProveedor:'',
      unidadesXCaja:'',
      cantidadCajas:'',
      cantidadUnitaria:'',
      guardado:false,
      IsOpen:false,
      error:'',
      proveedores: [],
      productos: []


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
    });
  }
  componentWillUnmount(){
    console.log('desmontando los links');

    this.proveedoresTraker.stop();
  }
  onSubmit(e){
    const { productos} =this.state;
    e.preventDefault();
    var cantidadProductos=this.state.productos.length;
    console.log("cantidade de productos: "+ cantidadProductos);
    productos.map((producto)=>{
      if(producto.nombreProveedor==this.state.nombreProveedor){
        console.log("nombre de proveedores iguales");
        Meteor.call('productos.updateInventario',producto._id,producto.cantidadUnitaria,producto.cantidadCajas,producto.unidadesXCaja,(err,res)=>{
          if(!err){
            this.setState({IsOpen:false,guardado:true,error:''});
            console.log("guardando");
            setTimeout(()=>this.setState({guardado:false}),1000 );
          }else{
            this.setState({error:err.reason});
          }
        });
      }
    });
    // Meteor.call('productos.ingresoInventario',productos,(err,res)=>{
    //   if(!err){
    //     this.setState({ productos: [],IsOpen:false,error:''});
    //   }else{
    //     this.setState({error:err.reason});
    //   }
    // });

  }
  // onChange(e){
  //   this.setState({
  //     nombreProveedor:e.target.value,
  //
  //   });
  // }

  // handleChange(key) {
  //   return function (e) {
  //     var state = {};
  //     state[key] =e.target.value;
  //     this.setState(state);
  //   };
  // }
  handleInputNumberChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : parseInt(target.value);
   const name = target.name;

   this.setState({
     [name]: value
   });
 }
 handleInputStringChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}


  // handleModalClose(){
  //   this.setState({IsOpen:false, nombreProducto:'',marca:'',nombreProveedor:'',unidadesXCaja:'',error:''});
  // }

  render(){

    return(
      <div>
        {/* <button className="button" onClick={()=>this.setState({IsOpen:true})}> + Agregar Producto</button> */}
        <PrivateHeader title="Ingresar Pedidos"/>
        {this.state.error ? <p>{this.state.error}</p> :undefined }

          <h1>Ingresar el inventario final</h1>
          <div  className='filaTabla'>
            <div className="columna3">
              <select value={this.state.nombreProveedor} name="nombreProveedor" onChange={this.handleInputStringChange.bind(this)}>
                <option value="">Seleccione el proveedor</option>
                {
                  this.state.proveedores.map((proveedor)=>{
                    return (<option key= {proveedor._id}  value={proveedor.nombreProveedor}>{proveedor.nombreProveedor}</option>)
                  })
                }

              </select>
            </div>
            <div className="columna3">
              <p className="p__centrada">Cajas</p>
            </div>
            <div className="columna3">
              <p className="p__centrada">Unidades Sueltas</p>

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
                                      console.log('variables i, j, k',i,j,k);
                                      return (<div key={i} className='filaTabla'>
                                                <div className="columna3">
                                                  <p key={i}>{producto.nombreProducto}</p>
                                                </div>

                                                <div className="columna3">
                                                  <div className="miniColumna5">
                                                    <button className="button " onClick={() => {
                                                      var productos2=[];
                                                      productos1=productos2.concat(this.state.productos);
                                                      productos1[z].cantidadCajas-=1;
                                                      this.setState({productos:productos1});
                                                      }} >-</button>
                                                  </div>
                                                  <div className="miniColumna5">
                                                    <p key={j}>{producto.cantidadCajas}</p>
                                                  </div>
                                                  <div className="miniColumna5">
                                                  <button className="button " onClick={() => {
                                                    var productos2=[];
                                                    productos1=productos2.concat(this.state.productos);
                                                    productos1[z].cantidadCajas+=1;
                                                    this.setState({productos:productos1});
                                                  }} >+</button>
                                                  </div>

                                                </div>
                                                <div className="columna3">
                                                  <div className="miniColumna5">
                                                    <button className="button " onClick={() => {
                                                      console.log("hola",this.state.productos);
                                                      console.log("holaaaa",this.state.productos[z]);
                                                      console.log("numero de cajas",this.state.productos[z].cantidadUnitaria);
                                                      var productos2=[];
                                                      productos1=productos2.concat(this.state.productos);
                                                      productos1[z].cantidadUnitaria-=1;
                                                      this.setState({productos:productos1});

                                                      console.log("numero de cajasv3",productos1);
                                                      console.log("holav3",this.state.productos);
                                                      }} >-</button>

                                                  </div>
                                                  <div className="miniColumna5">
                                                    <p key={k}>{producto.cantidadUnitaria}</p>
                                                  </div>
                                                  <div className="miniColumna5">
                                                  <button className="button " onClick={() => {
                                                    var productos2=[];
                                                    productos1=productos2.concat(this.state.productos);
                                                    productos1[z].cantidadUnitaria+=1;
                                                    this.setState({productos:productos1});

                                                    console.log("numero de cajasv3",productos1);
                                                    console.log("holav3",this.state.productos);
                                                  }} >+</button>
                                                  </div>


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
                                  : <p> seleccione un proveedor</p>
          }
          <div  className='filaTabla'>
            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">

              <button className="button">{this.state.guardado ? <p>Inventario Guardado</p> :<p>Grabar inventario</p> } </button>
              <button type="button" className="button button--secondary"
                onClick={()=>this.setState({IsOpen:false, nombreProducto:'',marca:'',nombreProveedor:'',unidadesXCaja:'',error:''})}
                > Cancelar la idiotes que escribiste </button>

            </form>
          </div>



      </div>
    );
  }
}
