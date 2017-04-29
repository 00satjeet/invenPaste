import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route, browserHistory} from 'react-router';


import Signup from '../ui/Signup';
import Login from '../ui/Login';

// import Link from '../ui/Link';
import ResumentInventario from '../ui/ResumenInventario';
import IngresoInventario from '../ui/IngresoInventario';
import RealizarPedido from '../ui/RealizarPedido';


import NotFound from '../ui/NotFound';

const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/resumen','/ingresoinventario','/realizarpedido'];

const onEnterPublicPage= ()=>{
if(Meteor.userId()){
  browserHistory.replace('/resumen');
}
};

const onEnterPrivatePage= ()=>{
if(!Meteor.userId()){
  browserHistory.replace('/');
}
};

export const onAuthChange=(isAuthenticated)=>{
  const pathname=browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage=unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage=authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/resumen');
  }else if(isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
  console.log('es verificado',isAuthenticated);
};


export const routes =(
<Router history={browserHistory}>
  <Route path="/" component={Login}  onEnter={onEnterPublicPage} />
  <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
  <Route path="/resumen" component={ResumenInventario} onEnter={onEnterPrivatePage}/>
  <Route path="/ingresoinventario" component={IngresoInventario} onEnter={onEnterPrivatePage}/>
  <Route path="/realizarpedido" component={RealizarPedido} onEnter={onEnterPrivatePage}/>


  <Route path="*" component={NotFound} />


</Router>

);
