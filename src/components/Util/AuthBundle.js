/**
 * Created by admin on 6/12/17.
 */
import React from 'react';

const AuthBundle = {
  isAuthenticated: false,
  token: "",
  authenticate(account, password){
    this.token = account;
    this.isAuthenticated = true;
  },
  signOut(){
    this.token = "";
    this.isAuthenticated = false;
  }
}

export default AuthBundle;
