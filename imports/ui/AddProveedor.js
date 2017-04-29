import {Meteor} from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddProveedor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      nombreProveedor:'',
      formaPago:'',
      pedidoMinimo:'',
      diasDespacho:'',
      telefono1:'',
      telefono2:'',
      IsOpen:false,
      error:''
    };
  }

  onSubmit(e){
    const { nombreProveedor,formaPago,pedidoMinimo,diasDespacho,telefono1,telefono2} =this.state;
    e.preventDefault();

    Meteor.call('proveedores.insert',nombreProveedor,formaPago,pedidoMinimo,diasDespacho,telefono1,telefono2,(err,res)=>{
      if(!err){
        this.setState({ nombreProveedor:'',formaPago:'',pedidoMinimo:'',diasDespacho:'',telefono1:'',telefono2:'',IsOpen:false,error:''});
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
  handleModalClose(){
    this.setState({IsOpen:false, nombreProveedor:'',formaPago:'',pedidoMinimo:'',diasDespacho:'',telefono1:'',telefono2:'',error:''});
  }
  render(){
    return(
      <div className="columna3">
        <button className="button" onClick={()=>this.setState({IsOpen:true})}> Agregar Proveedor</button>
        <Modal isOpen={this.state.IsOpen}
          contentLabel="agregar Proveedor"
           onAfterOpen={()=>this.refs.nombreProveedor.focus()}
           onRequestClose={this.handleModalClose.bind(this)}
           className="boxed-view__box"
           overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Agregar un Proveedor</h1>
          {this.state.error ? <p>{this.state.error}</p> :undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="text" name="nombreProveedor" ref="nombreProveedor" placeholder="Nombre del Proveedor" value={this.state.nombreProveedor}
            onChange={this.handleInputStringChange.bind(this)} />
            <input type="text" name="formaPago" ref="formaPago" placeholder="Forma de Pago" value={this.state.formaPago}
            onChange={this.handleInputStringChange.bind(this)} />
            <input type="Number" name="pedidoMinimo" ref="pedidoMinimo" placeholder="Dinero minimo de pedido" value={this.state.pedidoMinimo}
            onChange={this.handleInputNumberChange.bind(this)} />
            <input type="text" name="diasDespacho" ref="diasDespacho" placeholder="Dias de despacho" value={this.state.diasDespacho}
            onChange={this.handleInputStringChange.bind(this)} />
            <input type="text" name="telefono1" ref="telefono1" placeholder="telefono principal" value={this.state.telefono1}
            onChange={this.handleInputStringChange.bind(this)} />
            <input type="text" name="telefono2" ref="telefono2" placeholder="telefono secundario" value={this.state.telefono2}
            onChange={this.handleInputStringChange.bind(this)} />
            <button className="button"> Agregar Proveedor</button>
            <button type="button" className="button button--secondary"
              onClick={()=>this.setState({IsOpen:false, nombreProveedor:'',formaPago:'',pedidoMinimo:'',diasDespacho:'',telefono1:'',telefono2:'',error:''})}
              > Cancel </button>

          </form>

        </Modal>

      </div>
    );
  }
}
