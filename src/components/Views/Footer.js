/**
 * Created by admin on 5/29/17.
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';

class Footer extends React.Component {

  constructor() {
    super();
  }

  render() {
    return(
      <div className="Footer" style={{'height' : this.props.height}}>
        <h3 style={{marginTop: 0, marginBottom: 0, display: 'inline-block'}}>Get in touch with us via</h3>
        <a href="http://facebook.com/duy.dac.3">
          <FontAwesome
            className="Ico"
            name='facebook-official'
            size='2x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', display: 'inline-block' }}
          />
        </a>

        <a href="https://twitter.com/cklduy">
          <FontAwesome
            className="Ico"
            name='twitter'
            size='2x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', display: 'inline-block' }}
          />
        </a>

      </div>
    );
  }
}


Footer.defaultProps = {
};

export default Footer;
