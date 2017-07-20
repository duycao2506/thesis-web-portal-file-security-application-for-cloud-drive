/**
 * Created by admin on 5/29/17.
 */

import React from 'react';

class BigMenuItem extends React.Component {

  constructor(icon, content, eventListener) {
    super();
    this.icon = icon;
    this.content = content;
    this.eventListener = eventListener;
  }

  render() {
    return(
      <div className="bigMenuItem" style={{'height' : this.props.height}}>
        <img className="bigMenuItemImage" src={this.props.src}/>
        <h2>
          {this.props.title}
        </h2>
        <p>
          {this.props.text}
        </p>
      </div>
    );
  }
}


BigMenuItem.defaultProps = {
};

export default BigMenuItem;
