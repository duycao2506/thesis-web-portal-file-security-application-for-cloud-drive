/**
 * Created by admin on 5/29/17.
 */
import React from 'react';


class KasperBtn extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return(
      <div className= {this.props.state == 'normal'? "kasperbtn" : "kasperdarkbtn"} style=
        {{
          paddingBottom : this.props.paddingVer,
          paddingTop: this.props.paddingVer,
          paddingLeft: this.props.paddingHor,
          paddingRight: this.props.paddingHor,
          display :'inline-block'}} onClick={this.props.onClick} >
        {this.props.text}
      </div>
    );
  }


}


KasperBtn.defaultProps = {

};

export default KasperBtn;
