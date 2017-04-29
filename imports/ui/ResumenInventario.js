import React from 'react';
// import {Meteor} from 'meteor/meteor';

//import {browserHistory} from 'react-router';
// // import {Links} from '../api/links';
import AddProducto from './AddProducto';
import PrivateHeader from './PrivateHeader';
import AddProveedor from './AddProveedor';
import TablaResumenInventario from './TablaResumenInventario';
import RealizarPedido from './RealizarPedido';


export default ResumenInventario =()=>{
  return (
    <div>

      <PrivateHeader title="Resumen Pedidos"/>
      <div className="page-content">
          <p>Hola,  espero que este programa te pueda facilitar tu trabajo</p>
          <div className="fila">
            <AddProducto/>
            <AddProveedor/>
          </div>
      </div>

      <div className="page-contenido">
      <TablaResumenInventario/>
      </div>


    </div>
  );

};
