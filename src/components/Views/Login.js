/**
 * Created by admin on 6/12/17.
 */
require('styles/Login.css')
require('styles/LoadingIndicator.css');

import React from 'react';

import KasperBtn from './KasperBtn';
import {Modal} from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';
import AuthBundle from '../Util/AuthBundle';


class Login extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state ={
      username: '',
      password:'',
      error: '',
      loading: false
    };
    this.onChangeTextInForm = this.onChangeTextInForm.bind(this);
    this.onGoClick = this.onGoClick.bind(this);
    this.encodePassword = this.encodePassword.bind(this);
    this.hide = this.hide.bind(this)
  }

  hide(){
    this.setState({
      error: ''
    });
    this.props.onHide();
  }

  encodePassword(email, password){
    var bytes = []; // char codes
    for (var i = 0; i < password.length; ++i) {
      var code = password.charCodeAt(i);
      code = code ^ email.charCodeAt(i%email.length);
      bytes = bytes.concat([code & 0xff, code / 256 >>> 0]);
    }
    var result =  String.fromCharCode.apply(String, bytes);
    return result;
  }

  onChangeTextInForm(){
    this.setState({
      username: this.refs.txtEmail.value,
      password: this.refs.txtPassword.value,
      error: ""
    });
  }

  onGoClick(){
    var passi = this.encodePassword(this.state.username, this.state.password);
    var emaili = this.state.username;
    this.setState({loading:true});
    console.log(passi);
    passi = passi.replace(/\x00/g, '');
    console.log(passi);
    var json = JSON.stringify({
      "email" : emaili,
      "password": passi,
      "mac_address": "00:00:00:00:00:20"

    });
    console.log(json);
    fetch('https://scloud-server.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      },
      body: json,
      mode: 'cors'
    }).then((result) => {
      console.log(result);
      return result.json();
      throw new TypeError('Fail to login, check your email and password');
    }).then((item) => {
      this.setState({loading: false});
      if (item['status'] ==='fail'){
        this.setState({
          loading: false,
          error: item['message']
        });
      }else{
        this.props.callback(item['auth_token']);
      }
    }).catch((error)=> {
      console.log(error);
      this.setState({
        loading:false,
        error: "Fail to login"
      });
    });

  }

  render(){
    var regex = '(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))';
    return (
      <Modal  show={this.props.show} onHide={this.hide}>
          <div style={{backgroundColor:'deepskyblue', height:'1rem', borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit'}}></div>

          <div className='darktext loginCenter'>
            <h3>Sign in</h3>
            <div className='loginInput'>
              <input ref='txtEmail' type='email' placeholder='Email' onChange={this.onChangeTextInForm} />
            </div>
            <div className='loginInput'>
              <input ref='txtPassword' type='password' placeholder='Password' onChange={this.onChangeTextInForm} />
            </div>
            <div id='noticeBoard' className='notice'>
              {this.state.error}
            </div>
            <div style={{width: 'inherit',textAlign:'center', marginTop:'2rem', }}>
              {!this.state.loading ? <KasperBtn text='Go!' paddingVer='1rem' paddingHor='4rem' state="normal" onClick={this.onGoClick}/> : <LoadingIndicator/> }
            </div>


          </div>

      </Modal>

    );
  }
}

Login.defaultProps = {
};

export default Login;
