/**
 * Created by admin on 6/12/17.
 */
require('styles/Login.css')

import React from 'react';
import KasperBtn from './KasperBtn'
import {Modal} from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';

import SweetAlert from 'react-bootstrap-sweetalert';

class Signup extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      birthday:'',
      error: '',
      loading: false
    };
    this.onChangeTextInForm = this.onChangeTextInForm.bind(this);
    this.onGoClick = this.onGoClick.bind(this);
    this.encodePassword = this.encodePassword.bind(this);
    this.hide = this.hide.bind(this);
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

  onGoClick(){

    var birthday = this.refs.txtBirthday.value;
    var email = this.refs.txtEmail.value;
    var name = this.refs.txtName.value;
    var password = this.refs.txtPassword.value;
    password = password.replace(/\x00/g, '');
    var confirmPass = this.refs.txtConfirmPass.value;
    if(
      birthday.length == 0 || name.length == 0
      || email.length == 0 || password.length == 0
    ){
      this.setState({
        error: 'Required fields are not filled in'
      });
      return;
    }


    if (password.length < 6){
        this.setState({
          error: 'Password has to be more than 6 characters'
        });
        return;
    }

    var job = this.refs.txtJob.value;
    var country = this.refs.txtCountry.value;

    if (password === confirmPass){
      this.setState({
        loading:true
      });
      var bd = new Date(birthday);
      var jsonObj = {
        "email" : email,
        "password" : password,
        "birthday" : bd.getDate()+"/"+bd.getMonth()+"/"+bd.getFullYear(),
        "fullname" : name,
        "country" : country.length > 0 ? country : "Not available",
        "job" : job.length > 0 ? job : "Not available"
      };

      var json = JSON.stringify(jsonObj);

      console.log(json);
      fetch('https://scloud-server.herokuapp.com/auth/register', {
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
        this.setState({
          loading: false
        });
        if (item['status'] === 'success'){
          this.props.callback(item);
        }else{
          this.setState({
            error: item['message']
          });
        }

      }).catch((error)=> {
        console.log(error);
        this.setState({
          loading:false,
          error: "Fail to sign up, unknown error",
        });
      });
    }else{
      this.setState({
        error:'Wrong password confirmation!'
      });
    }
  }
  onChangeTextInForm(){
    this.setState({
      username: this.refs.txtEmail.value,
      password: this.refs.txtPassword.value,
      birthday: this.refs.txtBirthday.value
    });
    console.log(this.state);
  }


  focusDate(e){
    e.currentTarget.type = 'date';
  }
  unfocusDate(e){
    e.currentTarget.type = 'text';
  }

  render(){
    return (
      <Modal  show={this.props.show} onHide={this.hide}>
        <div style={{backgroundColor:'deepskyblue', height:'1rem', borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit'}}></div>

        <div className='darktext loginCenter'>
          <h3>Sign up</h3>
          <div className='loginInput'>
            <input ref='txtEmail' type='email' placeholder='Email(*)' onChange={this.onChangeTextInForm}/>
          </div>

          <div className='loginInput'>
            <input ref='txtName' type='text' placeholder='Name (*) ' />
          </div>
          <div className='loginInput'>
            <input ref='txtPassword' type='password' placeholder='Password (*) ' onChange={this.onChangeTextInForm}/>
          </div>
          <div className='loginInput'>
            <input ref='txtConfirmPass' type='password' placeholder='Confirm Password (*) ' />
          </div>
          <div className='loginInput'>
            <input ref='txtBirthday' type='text' onFocus={this.focusDate} onBlur={this.unfocusDate}  placeholder='Birthday (*) ' onChange={this.onChangeTextInForm}/>
          </div>
          <div className='loginInput'>
            <input ref='txtCountry' type='text' placeholder='Country' />
          </div>
          <div className='loginInput'>
            <input ref='txtJob' type='text' placeholder='Job' />
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

Signup.defaultProps = {
};

export default Signup;
