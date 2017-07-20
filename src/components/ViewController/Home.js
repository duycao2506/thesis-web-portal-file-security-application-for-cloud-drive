/**
 * Created by admin on 5/29/17.
 */
import React from 'react';
import {Grid, Row, Col, Popover, Tooltip} from 'react-bootstrap';
import BigMenuItem from '../Views/BigMenuItem';
import KasperBtn from '../Views/KasperBtn';
import Footer from '../Views/Footer';
import Login from '../Views/Login';
import Signup from '../Views/Signup';
import cookie from 'react-cookies';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.state = {
      token: "",
      showLogin: false,
      showSignup: false
    };


    this.openSignIn = this.openSignIn.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
    this.toDashboard = this.toDashboard.bind(this);
    this.navigateLogin = this.navigateLogin.bind(this);
    this.signOut = this.signOut.bind(this);


  }

  componentDidMount(){
    this.setState({token: cookie.load('userToken')});
  }

  signOut(){
    cookie.remove('userToken',{path: '/'});
    this.setState({token: null});
  }

  navigateLogin(token){
    this.setState({token: token});
    cookie.save('userToken', token, { path: '/' });
    this.props.history.push('/user');
  }

  openSignIn(){
    this.setState({showLogin:true});
  }

  openSignUp(){
    this.setState({showSignup:true});
  }

  closeLogin(){
    this.setState({showLogin:false});
  }


  closeSignUp(){
    this.setState({showSignup:false});
  }

  toDashboard(){
    this.props.history.push('/user');
  }




  render() {
    var safeText = 'The files uploaded from your authorized devices are optional for you to lock or not. Only those devices can decode the encoded files. ';
    var save_moneytext = 'You do not need to purchase more storage from cloud service companies, just register free accounts and connect them to our application.';
    var portabletext = 'The files from different cloud serivces can be accessed everywhere without having their application in your device. Centralized!';
    var facebook = "http://facebook.com/duy.dac.3";

    return (
      <div id="home">
        <div id="main_panel" className="container-fluid bg-1" >
          <div id="brand">
            <img id="app_ico" src="/images/app_ico.png" alt="Bird"/>
            <div id="app_title_text">
              <h1 id="app_name">S-Cloud</h1>
              <h3 id="slogan">A free secured cloud explorer</h3>
            </div>
          </div>



        </div>

        {
          this.state.token == null?
            <div id="actions">
              <div className="Homebtn">
                <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem" text="Sign in" state="normal" onClick={this.openSignIn} />
              </div>
              <div className="Homebtn">
                <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="Sign up" state="normal" onClick = {this.openSignUp}/>
              </div>
              <hr/>
            </div>
            :
            <div id="actions">
              <h3>Hello, {this.state.token}</h3>
              <div className="Homebtn">
                <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="3rem"  text="To Dashboard" state="normal" onClick = {this.toDashboard}/>
              </div>
              <div className="Homebtn">
                <KasperBtn className="Homebtn" paddingVer="1rem" paddingHor="5rem"  text="Sign out" state="normal" onClick = {this.signOut}/>
              </div>
              <hr/>
            </div>
        }

        <Grid id="option_panel" >
          <Row  >
            <Col md={4} sm={12} >
              <div className="card">
                <BigMenuItem src="images/safe.png"  title="Safe" text={safeText} />
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className="card">
                <BigMenuItem src ="images/save_money.png" title="Economic" text={save_moneytext} />
              </div>
            </Col>
            <Col md={4} sm={12} >
              <div className="card">
                <BigMenuItem  src="images/portable.png" title="Portable" text={portabletext} />
              </div>
            </Col>
          </Row>
        </Grid>

        <Footer />

        <Login show={this.state.showLogin} onHide={this.closeLogin} callback={this.navigateLogin}/>
        <Signup show={this.state.showSignup} onHide={this.closeSignUp} callback={this.navigateLogin}/>
      </div>

    );
  }
}


Home.defaultProps = {};

export default Home;
