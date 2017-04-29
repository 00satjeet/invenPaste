import React from 'react';
// import {Meteor} from 'meteor/meteor';

//import {browserHistory} from 'react-router';
// // import {Links} from '../api/links';
import AddProducto from './AddProducto';
import PrivateHeader from './PrivateHeader';
import AddProveedor from './AddProveedor';
import TablaResumenPedido from './TablaResumenPedido';

export default RealizarPedido =()=>{
  return (
    <div>

      <PrivateHeader title="Realizar el pedido"/>
      
      <div className="page-contenido">
      <TablaResumenPedido/>
      </div>


    </div>
  );

};
