import React, { Component } from 'react';
import TabList from './tab_list.js';
import SearchBox from './search_box.js';
import stringScore from './string_score.js';
import tabFilterMain from './filter.js'

export default class Root extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    	tabs: this.props.tabs,
      filter: "",
      selected: null
    };
  };

  removeURL(key) {
  	chrome.storage.local.get({urls: []}, function (result) {
      var urls = result.urls;
      urls = urls.filter(function(obj) {
      	return obj.id != key;
      });
      this.setState({
    	 tabs: urls
      });
      chrome.storage.local.set({urls: urls}, function () {});
    }.bind(this));
  }

  filteredTabs(){
    var tabFilter = tabFilterMain(stringScore);
    if (this.state.filter.trim().length) {
      return tabFilter(this.state.filter, this.state.tabs);
    } 
    else {
      return this.state.tabs;
    }
  }

  changeFilter(value) {
    this.setState({
      filter: value
    });
  }

  changeSelected(tab) {
    this.setState({selected: tab});
  }

  modifySelected(change) {
    var filteredTabs = this.filteredTabs();
    if (!filteredTabs.length) return;
    var currentIndex = filteredTabs.indexOf(this.state.selected);
    var newIndex = currentIndex + change;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= filteredTabs.length) newIndex = filteredTabs.length - 1;
    var newTab = filteredTabs[newIndex];
    this.changeSelected(newTab);
    window.scrollBy(0,50*change);
  }

  activateSelected() {
    chrome.tabs.create({url: this.getSelected().url});
  }

  getSelected() {
    if(this.state.selected == null) 
      this.state.selected = this.filteredTabs()[0];
    return this.state.selected; 
  }

  render() {
    return (
    	<div>
          <SearchBox filter={this.state.filter} changeSelected={this.changeSelected} changeFilter={this.changeFilter.bind(this)} activateSelected={this.activateSelected.bind(this)}
          modifySelected={this.modifySelected.bind(this)} />
      		<TabList tabs={this.filteredTabs()} selectedTab={this.getSelected()} changeSelected={this.changeSelected.bind(this)} remove_url={this.removeURL.bind(this)} filter={this.state.filter}/> 
    	</div>
    );
  }
}
