/**
 * Created by admin on 6/12/17.
 */
require('styles/Login.css')

import React from 'react';
import KasperBtn from './KasperBtn'
import {Modal} from 'react-bootstrap';

class Signup extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      birthday:'',
      error: ''
    };
    this.onChangeTextInForm = this.onChangeTextInForm.bind(this);
    this.onGoClick = this.onGoClick.bind(this);
  }

  onGoClick(){
    console.log(this.state);
  }

  onChangeTextInForm(){
    this.setState({
      username: this.refs.txtEmail.value,
      password: this.refs.txtPassword.value,
      birthday: this.refs.txtBirthday.value,
      error:this.refs.txtEmail.value
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
      <Modal  show={this.props.show} onHide={this.props.onHide}>
        <div style={{backgroundColor:'deepskyblue', height:'1rem', borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit'}}></div>

        <div className='darktext loginCenter'>
          <h3>Sign up</h3>
          <div className='loginInput'>
            <input ref='txtEmail' type='email' placeholder='Email' onChange={this.onChangeTextInForm}/>
          </div>
          <div className='loginInput'>
            <input ref='txtPassword' type='password' placeholder='Password' onChange={this.onChangeTextInForm}/>
          </div>
          <div className='loginInput'>
            <input type='password' placeholder='Confirm Password' />
          </div>
          <div className='loginInput'>
            <input ref='txtBirthday' type='text' onFocus={this.focusDate} onBlur={this.unfocusDate}  placeholder='Birthday' onChange={this.onChangeTextInForm}/>
          </div>
          <div className='loginInput'>
            <input type='text' placeholder='Country' />
          </div>
          <div className='loginInput'>
            <input type='text' placeholder='Biography' />
          </div>
          <div className='loginInput'>
            <input type='text' placeholder='Job' />
          </div>

          <div id='noticeBoard' className='notice'>
            {this.state.error}
          </div>

          <div style={{width: 'inherit',textAlign:'center', marginTop:'2rem', }}>
            <KasperBtn text='Go!' paddingVer='1rem' paddingHor='4rem' state="normal" onClick={this.onGoClick}/>
          </div>

        </div>

      </Modal>

    );
  }
}

Signup.defaultProps = {
};

export default Signup;
