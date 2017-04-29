import React,{Component} from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
export default class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      error:''
    };
  }

  onSubmit(e){
    e.preventDefault();
    let email=this.refs.email.value.trim();
    let password=this.refs.password.value.trim();
    Meteor.loginWithPassword({email},password,(err)=>{
      if(err){
        this.setState({error:'No se puede entrar. Revisa tu correo y clave'});
      }else{
        this.setState({error:''});
      }
      console.log('Login callback',err);
    });
  }
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Acceso </h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type="email" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button">Entrar al Sistema</button>
          </form>

          <Link to="/signup">Necesitas una cuenta?</Link>
        </div>

      </div>

    );
  }
}
