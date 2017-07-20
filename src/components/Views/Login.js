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
  }

  onChangeTextInForm(){
    this.setState({
      username: this.refs.txtEmail.value,
      password: this.refs.txtPassword.value,
      error:this.refs.txtEmail.value
    });
  }

  onGoClick(){
    this.setState({loading:true});
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then( (result) =>{
        return result.json();
      })
      .then( (items)=>{
        this.setState({loading: false});
        console.log(items);
        AuthBundle.authenticate('sda','dsadsadsa');
        this.props.callback('ds14214wqewq');
      });
  }

  render(){
    var regex = '(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))';
    return (
      <Modal  show={this.props.show} onHide={this.props.onHide}>
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
