import React, { Component } from 'react';
import style from './tab_item.css';

export default class TabItem extends Component {

  render() {
  	var self = this;
    return (
    	<div className={this.className()} ref="show"> 
      		<li onMouseEnter={this.onMouseEnter.bind(this)}><a href={this.props.tab.url}>{this.newString()}</a> <img src="img/ic_clear_black_24dp_1x.png" onClick={() => self.onClick(this.props)}/></li>
      </div>
    );
  }

  newString() {
    let temp = this.props.tab.title.charAt(0).toUpperCase() + this.props.tab.title.slice(1);
    return temp.substring(0,40);
  }

  onClick(props) {
    this.props.remove_url(this.props.tab.id);
  }

  onMouseEnter() {
    this.props.changeSelected(this.props.tab);
  }

  className() {
    return this.props.selected ? style.selected : "";
  }

}