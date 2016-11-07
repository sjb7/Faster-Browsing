import React, { Component } from 'react';
import style from './search_box.css';

var KEY_ENTER = 13;
var KEY_UP = 38;
var KEY_DOWN = 40;

export default class SearchBox extends Component {

  componentDidMount() {
    var temp = this.refs.input;
    setInterval(function() {
      temp.focus();
    },3000);
  }
  
  onChange(event) {
    if (event.target.value !== this.props.filter)
      this.props.changeFilter(event.target.value);
  }

  onKeydown(evt){
    switch (evt.which) {
	    case KEY_ENTER:
	      this.props.activateSelected();
	      break;
	    case KEY_UP:
	      this.props.modifySelected(-1);
	      evt.preventDefault();
	      break;
	    case KEY_DOWN:
	      this.props.modifySelected(1);
	      evt.preventDefault();
	      break;
    }
  }

  render() {
    return (
      <input className={style.style} type='text' ref='input' autoFocus='true' onKeyDown={this.onKeydown.bind(this)} onChange={this.onChange.bind(this)} />
    );
  }

}