/**
 * Created by admin on 6/12/17.
 */
/**
 * Created by admin on 5/29/17.
 */
import React from 'react';


class KasperInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      regex : this.props.regex,
      error: false
    };
  }


  validate(e){
    var patt = RegExp(this.state.regex, 'g');
    console.log(patt);
    if (!patt.test(e.target.value)){
      this.setState({error:true});
      console.log(e.target.value);
    }else{
      this.setState({error:false});
      console.log(e.target.value + "DSA");
    }
  }


  render() {
    return(
      <input type={this.props.type} onFocus={this.props.onFocus} onBlur={this.props.onBlur} placeholder={this.props.placeHolder}
            style={{borderColor: this.state.error? "red" : "rgba(255, 182, 78, 0.95)"}}
             onChange={this.validate.bind(this)}

      />
    );
  }
}


KasperInput.defaultProps = {
};

export default KasperInput;
