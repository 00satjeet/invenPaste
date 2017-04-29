import {Meteor} from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import {Tracker} from 'meteor/tracker';
import {Proveedores} from '../api/proveedores';

// nombreProducto,marca,nombreProveedor,unidadesXCaja,cantidadUnitaria,
  // cantidadCajas,precioUnitario,precioXCaja,esPrecioAproximado,esEnCaja

export default class AddProducto extends React.Component{
  constructor(props){
    super(props);
    this.state={
      nombreProducto:'',
      marca:'',
      nombreProveedor:'',
      unidadesXCaja:'',
      cantidadUnitaria:'',
      cantidadCajas:'',
      precioUnitario:'',
      precioXCaja:'',
      esPrecioAproximado:false,
      esEnCaja:false,
      IsOpen:false,
      error:'',

      proveedores: []


    };
  }
  componentDidMount(){
    this.proveedoresTraker=Tracker.autorun(()=>{
      Meteor.subscribe('proveedores');
      const misProveedores=Proveedores.find({
        visible:true
      }).fetch();
      this.setState({proveedores:misProveedores});
      console.log('los links que tengo son', misProveedores);
    });
  }
  componentWillUnmount(){
    console.log('desmontando los links');

    this.proveedoresTraker.stop();
  }
  onSubmit(e){

    const { nombreProducto,marca,nombreProveedor,unidadesXCaja,cantidadUnitaria,cantidadCajas,
      precioUnitario,precioXCaja,esPrecioAproximado,esEnCaja} =this.state;
    e.preventDefault();

    // if(this.state.precioXCaja==''){
    //   // setTimeout(()=>this.setState({precioXCaja:0}),1000 );
    //   this.setState({precioXCaja:0});
    // }

    Meteor.call('productos.insert',nombreProducto,marca,nombreProveedor,unidadesXCaja== '' ? 0:unidadesXCaja ,
    cantidadUnitaria== '' ? 0:cantidadUnitaria ,cantidadCajas== '' ? 0:cantidadCajas ,precioUnitario == '' ? 0:precioUnitario ,
    precioXCaja == '' ? 0: precioXCaja,esPrecioAproximado,esEnCaja,(err,res)=>{
      if(!err){
        this.setState({ nombreProducto:'',marca:'',nombreProveedor:'',unidadesXCaja:'',cantidadUnitaria:'',cantidadCajas:'',
        precioUnitario:'',precioXCaja:'',esPrecioAproximado:false,esEnCaja:false,IsOpen:false,error:''});
      }else{
        this.setState({error:err.reason});
      }
    });

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
   console.log('value de numero'+value);

   const value = target.value ==''? 0: parseInt(target.value);
   const name = target.name;
   console.log('nombreNumero'+name);
   console.log('value ----:'+ value);

   this.setState({
     [name]: value
   });
 }
 handleInputBooleanChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : parseInt(target.value);
  const name = target.name;

  this.setState({
    [name]: value
    },()=>{
      console.log("nombre1"+name);
      console.log("value1"+value);
    }
  );
}
 handleInputStringChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}
  handleModalClose(){
    this.setState({IsOpen:false, nombreProducto:'',marca:'',nombreProveedor:'',unidadesXCaja:'',cantidadUnitaria:'',cantidadCajas:'',error:''});
  }

  render(){

    return(
      <div className="columna3">
        <button className="button" onClick={()=>this.setState({IsOpen:true})}> Agregar Producto</button>
        <Modal isOpen={this.state.IsOpen}
          contentLabel="agregar Proveedor"
           onAfterOpen={()=>this.refs.nombreProducto.focus()}
           onRequestClose={this.handleModalClose.bind(this)}
           className="boxed-view__box"
           overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Agregar un Producto</h1>
          {this.state.error ? <p>{this.state.error}</p> :undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <select value={this.state.nombreProveedor} name="nombreProveedor" onChange={this.handleInputStringChange.bind(this)}>
              <option value="">seleciona el proveedor</option>
              {
                this.state.proveedores.map((proveedor)=>{
                  return (<option key= {proveedor._id}  value={proveedor.nombreProveedor}>{proveedor.nombreProveedor}</option>)
                })
              }

            </select>

            <input type="text" name="nombreProducto" ref="nombreProducto" placeholder="Nombre del Producto" value={this.state.nombreProducto}
            onChange={this.handleInputStringChange.bind(this)} />
            <input type="text" name="marca" ref="marca" placeholder="Marca del Producto" value={this.state.marca}
            onChange={this.handleInputStringChange.bind(this)} />
            {/* <input type="text" name="nombreProveedor" ref="nombreProveedor" placeholder="Proveedor del producto" value={this.state.nombreProveedor}
            onChange={this.handleInputStringChange.bind(this)} /> */}
            <input type="Number" name="unidadesXCaja" ref="unidadesXCaja" placeholder="Unidades x Caja" value={this.state.unidadesXCaja}
            onChange={this.handleInputNumberChange.bind(this)} />
            <input type="Number" name="cantidadUnitaria" ref="cantidadUnitaria" placeholder="Cantidad de unidades sueltas" value={this.state.cantidadUnitaria}
            onChange={this.handleInputNumberChange.bind(this)} />
            <input type="Number" name="cantidadCajas" ref="cantidadCajas" placeholder="Cantidad de cajas completas" value={this.state.cantidadCajas}
            onChange={this.handleInputNumberChange.bind(this)} />

            <input type="Number" name="precioUnitario" ref="precioUnitario" placeholder="Precio unitario" value={this.state.precioUnitario}
            onChange={this.handleInputNumberChange.bind(this)} />
            <input type="Number" name="precioXCaja" ref="precioXCaja" placeholder="Precio de la caja" value={this.state.precioXCaja}
            onChange={this.handleInputNumberChange.bind(this)} />
            <label className="checkbox__input">
              <input className="checkbox__input" type="checkbox"  name="esPrecioAproximado" value={this.state.esPrecioAproximado}
            checked= {this.state.esPrecioAproximado} onChange={this.handleInputBooleanChange.bind(this)}  /> el precio es aproximado?
            </label>

            <label className="checkbox__input">
              <input type="checkbox" name="esEnCaja" value={this.state.esEnCaja}
            checked= {this.state.esEnCaja} onChange={this.handleInputBooleanChange.bind(this)} /> Solo se compra en cajas?
            </label>



            <button className="button"> Agregar Producto</button>
            <button type="button" className="button button--secondary"
              onClick={()=>this.setState({IsOpen:false, nombreProducto:'',marca:'',nombreProveedor:'',unidadesXCaja:'',
              cantidadUnitaria:'',cantidadCajas:'',error:''})}
              > Cancel </button>

          </form>

        </Modal>

      </div>
    );
  }
}

// <label className="checkbox">
//   <input className="checkbox__box" type="checkbox" checked= {this.state.esPrecioAproximado} /> el precio es aproximado? <br></br>
//   <input className="checkbox__box" type="checkbox" checked= {this.state.esEnCaja} /> Solo se compra en cajas?
//
// </label>
