/**
  * Created by admin on 5/29/17.
  */
require('rc-tabs/assets/index.css');
require('styles/UserPage.css');
require('styles/Common.css');



import React from 'react';
import Tabs from 'rc-tabs';
import TabPane from 'rc-tabs/lib/TabPane';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import Tabbar from 'rc-tabs/lib/SwipeableInkTabBar';
import {Table} from 'react-bootstrap';
import LoadingIndicator from '../Views/LoadingIndicator';
import KasperBtn from '../Views/KasperBtn';
import {Line} from 'rc-progress';
import cookie from 'react-cookies';
import SweetAlert from 'react-bootstrap-sweetalert';

const parseOneDevice = (index, device) => (
  <tr id={'dev'+index}>
    <td id="dev-index">{index}</td>
    <td id="dev-name">{device['deviceName']}</td>
    <td id="dev-os">{device['deviceOS'] + " " + device['OSVersion'] } </td>
    <td id="dev-isRoot">
      {
        index == 1 ?
          <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="NO" state="disabled" />
          :
          <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="YES" state="normal" />
      }
    </td>
  </tr>
);

class UserPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      alert: null,
      tabIndex: 1,
      loading: true,
      devices: [
        {
          'id' : 0,
          'deviceName': 'Samsung',
          'deviceOS': 'Android',
          'OSVersion': '5.1',
          'isRoot': true
        },
        {
          'id' : 1,
          'deviceName': 'Oppo',
          'deviceOS': 'Android',
          'OSVersion': '7.1',
          'isRoot': false
        }],
      profile: null,
      profileBuffer: null,
      fileUpload: null,
    }
    this.chooseFile = this.chooseFile.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toHomePage = this.toHomePage.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.doAlert = this.doAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.unfocusDate = this.unfocusDate.bind(this);
  }

  hideAlert(){
    this.setState({
      alert: null
    });
  }

  updateProfile(){


    var birthday = new Date(this.refs.txtBirthday.value);
    var json = JSON.stringify({
      birthday : birthday.getDate()+"/"+(birthday.getMonth()+1)+"/"+birthday.getFullYear(),
      job : this.refs.txtJob.value,
      country: this.refs.txtCountry.value,
      fullname: this.refs.txtName.value
    });

    var profileBuffer = {
      "birthday" : birthday.toDateString(),
      "job" : this.refs.txtJob.value,
      "country": this.refs.txtCountry.value,
      "fullname": this.refs.txtName.value,
      "email": this.refs.txtEmail.value
    }

    this.setState({
      loading:true,
      profileBuffer: profileBuffer
    });

    console.log(json);

    var authortoken = 'Bearer ' + cookie.load('userToken');
    console.log(authortoken);
    fetch('https://scloud-server.herokuapp.com/auth/profile', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.load('userToken')
      },
      body: json,
      mode: 'cors'
    }).then((result) => {
      console.log(result);
      return result.json();
    }).then((item) => {
      console.log(item);
      if (item['status'] ==='fail'){
        this.setState({
          loading: false,
          alert: this.doAlert('profile_fail',item['message']),
          profileBuffer: null
        });
      }else{
        var profile = this.state.profileBuffer;
        this.setState(
          {
            loading:false,
            alert: this.doAlert('profile_success',item['message']),
            profile: profile
          }
        );
        cookie.save('userName', this.state.profile['fullname'], { path: '/' });
      }
    }).catch((error)=> {
      console.log(error);
      this.setState({
        loading:false,
        alert: this.doAlert('profile_fail',"Fail to update your profile")
      });
    });

  }


  doAlert(code,mess){
    var result = null;
    switch (code){
      case 'profile_success':
        result = (
          <SweetAlert success title="Profile" onConfirm={this.hideAlert}>
            {mess}
        </SweetAlert>
        )
        break;
      case 'profile_fail':
        result = <SweetAlert danger title="Profile" onConfirm={this.hideAlert}>
          {mess}
        </SweetAlert>
        break;
      case 'signout_fail':
        result = <SweetAlert danger title="Sign Out" onConfirm={this.hideAlert}>
          {mess}
        </SweetAlert>
        break;
    }
    return result;
  }

  signOut(){
    this.setState({
      loading:true
    })
    fetch('https://scloud-server.herokuapp.com/auth/logout', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.load('userToken')
      },
      mode: 'cors'
    }).then((result) => {
      console.log(result);
      return result.json();
    }).then((item) => {
      console.log(item);
      if (item['status'] ==='fail'){
        this.setState({
          loading: false,
          alert: this.doAlert('signout_fail',item['message'])
        });
      }else{
        this.setState(
          {
            loading: false,
          }
        );
        cookie.remove('userToken',{path:'/'});
        cookie.remove('userName', {path:'/'});
        this.props.history.push('/');
      }
    }).catch((error)=> {
      console.log(error);
      this.setState({
        loading:false,
        error: "Fail to login"
      });
    });
  }

  toHomePage(){
    this.props.history.push('/');
  }

  componentDidMount() {
    fetch('https://scloud-server.herokuapp.com/auth/profile', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookie.load('userToken')
      },
      mode: 'cors'
    }).then((result) => {
      console.log(result);
      return result.json();
    }).then((item) => {
      console.log(item);
      if (item['status'] ==='fail'){
        this.setState({
          loading: false,
          error: item['message']
        });
      }else{

        this.setState(
          {
            loading:false,
            profile: item
          }
        );
        cookie.save('userName', this.state.profile['fullname'], { path: '/' });
      }
    }).catch((error)=> {
      console.log(error);
      this.setState({
        loading:false,
        error: "Fail to login"
      });
    });

  }

  chooseFile(e) {
    this.setState({fileUpload: e.target.value});
  }

  focusDate(e) {
    e.currentTarget.type = "date";
  }

  unfocusDate(e) {
    e.currentTarget.type = "text";
    if(e.currentTarget.value.length == 0){
      e.currentTarget.value = this.convertDate(this.state.profile['birthday']);
    }
  }

  parseItems(list) {
    var rows = [];
    for (let i = 0; i < list.length; i++) {
      rows.push(parseOneDevice(i + 1, list[i]));
    }
    return rows;
  }

  convertDate(str){
    var date = new Date(str);
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  render() {
    return (
      <div className="user">
        <div id="user_header">
          <div id="brand" >
            <img id="app_ico_small" src="/images/app_ico.png" alt="Bird" onClick={this.toHomePage}/>
            <div id="title">
              <h1 id="title_page">Dashboard</h1>
            </div>

          </div>


        </div>
        <div id="user_page_body">
          {
            this.state.loading ?
              <LoadingIndicator/>
              :
              <Tabs
                tabBarPosition="top"
                defaultKeyActive="1"
                renderTabBar={() =>
                  <Tabbar
                    pageSize={2}
                  />
                }
                renderTabContent={() =>
                  <TabContent />
                }
              >
                <TabPane tab='User' key={1}>
                  <div id="profileForm" className="card">
                    <div id="avatar">
                      <img id="avatarImg" src="images/default.jpeg"/>
                    </div>
                    <div id="btnSignOut" style={{
                      marginTop:'1rem',
                      textAlign:'center'
                    }} >
                      <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="Sign out" state="normal" onClick={this.signOut} />
                    </div>
                    <div className="loginInput">
                      <p>Email</p>
                      <input ref="txtEmail"
                             type="email"
                             placeholder="Email"
                             disabled={true}
                             value={this.state.profile['email']}/>
                    </div>

                    <div className="loginInput">
                      <p>Name</p>
                      <input ref='txtName'
                             type="email"
                             placeholder="What are you called?"
                             defaultValue={this.state.profile['fullname']}/>
                    </div>

                    <div className="loginInput">
                      <p>Birthday</p>
                      <input ref='txtBirthday'
                             type="text"
                             onFocus={this.focusDate}
                             onBlur={this.unfocusDate}
                             placeholder="The date you was born"
                             defaultValue={this.convertDate(this.state.profile['birthday'])}
                      />
                    </div>
                    <div className="loginInput">
                      <p>Country</p>
                      <input ref='txtCountry'
                             type="text"
                             placeholder="Where you live"
                             defaultValue={this.state.profile['country']}/>
                    </div>
                    <div className="loginInput">
                      <p>Job</p>
                      <input ref='txtJob'
                             type="text"
                             placeholder="Things you do"
                             defaultValue={this.state.profile['job']}/>
                    </div>


                    <div style={{textAlign:'center', marginTop:'2rem'}}>
                      <KasperBtn className="Homebtn"
                                 paddingVer="1rem"
                                 paddingHor="3rem"
                                 text="Update"
                                 state="normal"
                                 onClick ={this.updateProfile}/>
                    </div>
                  </div>
                </TabPane>


                <TabPane tab='Devices' key={2}>
                  <div id="profileForm" className="card">
                    <Table responsive>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Device Name</th>
                        <th>Device OS</th>
                        <th>Is Root Device</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.parseItems(this.state.devices)}
                      </tbody>
                    </Table>
                  </div>
                </TabPane>

              </Tabs>
          }
        </div>
        {this.state.alert}
      </div>
    );
  }
}

/*
 <div className="loginInput">
 <p>Password</p>
 <input ref="txtPassword" type="password" placeholder="Type password to update your profile"
 onChange={this.onChangeTextInForm}/>
 </div>
 <div className="loginInput">
 <p>Confirm Password</p>
 <input type="password" placeholder="Confirm Password"/>
 </div>
 */
UserPage.defaultProps = {};

export default UserPage;
