import React,{Component} from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default class Signup extends Component{
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

    Accounts.createUser({email:email,password},(err)=>{
      if(err){
        this.setState({error:err.reason});
      }else{
        this.setState({error:''});
      }
      console.log('signup callback',err);
    });
    //this.setState({error:"algo fue mal"});
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Registro</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button">Crear Cuenta</button>
          </form>


          <Link to="/">Ya tienes una Cuenta</Link>
        </div>
      </div>


    );
  }
}
