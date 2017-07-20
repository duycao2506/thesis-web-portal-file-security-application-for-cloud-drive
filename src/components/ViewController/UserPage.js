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

const parseOneDevice = (index, device) => (
  <tr>
    <td>{index}</td>
    <td>{device['body']}</td>
    <td>{'Android OS Version ' + device['userId'] } </td>
    <td>
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
      tabIndex: 1,
      loading: true,
      devices: [
        {
          'deviceName': 'Samsung',
          'deviceOS': 'Android',
          'OSVersion': '5.1',
          'isRoot': true
        },
        {
          'deviceName': 'Oppo',
          'deviceOS': 'Android',
          'OSVersion': '7.1',
          'isRoot': false
        }],
      profile: null,
      fileUpload: null,
    }
    this.chooseFile = this.chooseFile.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toHomePage = this.toHomePage.bind(this);

  }

  signOut(){
    cookie.remove('userToken',{path:'/'});
    this.props.history.push('/');
  }

  toHomePage(){
    this.props.history.push('/');
  }

  componentDidMount() {
    fetch(`http://jsonplaceholder.typicode.com/posts`)
      .then((result) => {
        return result.json();
      })
      .then((items) => {
        this.setState({loading: false, devices: items});
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
  }

  parseItems(list) {
    var rows = [];
    for (let i = 0; i < list.length; i++) {
      rows.push(parseOneDevice(i + 1, list[i]));
    }
    return rows;
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
          <div id="btnSignOut" style={{
            color: "#aeeeee",
            position:'absolute',
            display:'inline-block',
            float:'right',
            padding: '2.5rem'
            //{/*marginBottom: '3rem',*/}
          }} >
            <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="Sign out" state="normal" onClick={this.signOut} />
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
                <TabPane tab='Profile' key={1}>
                  <div id="profileForm" className="card">
                    <div id="avatar">
                      <img id="avatarImg" src="images/default.jpeg"/>
                    </div>
                    <div className="loginInput">
                      <p>Email</p>
                      <input ref="txtEmail" type="email" placeholder="Email" onChange={this.onChangeTextInForm} disabled={true}/>
                    </div>

                    <div className="loginInput">
                      <p>Birthday</p>
                      <input ref="txtBirthday" type="text" onFocus={this.focusDate} onBlur={this.unfocusDate}
                             placeholder="The date you was born" onChange={this.onChangeTextInForm}/>
                    </div>
                    <div className="loginInput">
                      <p>Country</p>
                      <input type="text" placeholder="Where you live"/>
                    </div>
                    <div className="loginInput">
                      <p>Job</p>
                      <input type="text" placeholder="Things you do"/>
                    </div>

                    <div className="loginInput">
                      <p>Password</p>
                      <input ref="txtPassword" type="password" placeholder="Type password to update your profile"
                             onChange={this.onChangeTextInForm}/>
                    </div>
                    <div className="loginInput">
                      <p>Confirm Password</p>
                      <input type="password" placeholder="Confirm Password"/>
                    </div>
                    <div style={{textAlign:'center', marginTop:'2rem'}}>
                      <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="Update" state="normal" />
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
      </div>
    );
  }
}


UserPage.defaultProps = {};

export default UserPage;
