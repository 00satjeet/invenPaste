import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {Link} from 'react-router';


const PrivateHeader =(props)=>{
  // onLogout(){
  //   Accounts.logout();
  // }
  return(
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <Link to="/resumen" className="button button--link">Resumen Inventario</Link>
        <Link to="/ingresoinventario" className="button button--link">Ingresar Inventario</Link>
        <Link to="/realizarpedido" className="button button--link">Realizar Pedido</Link>


        <button className="button button--link-text" onClick={() => Accounts.logout()}>Desconectar</button>
      </div>

    </div>
  );

}

{/* <button onClick={this.onLogout.bind(this)}>Logout</button> */}

PrivateHeader.propTypes={
  title:PropTypes.string.isRequired,


};

export default PrivateHeader;
