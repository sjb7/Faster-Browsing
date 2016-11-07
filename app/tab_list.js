import React, { Component } from 'react';
import TabItem from './tab_item';
import styles from './tab_list.css';

export default class TabList extends Component {
  render() {
    return (
      <ol className={styles.roundedList}>
        {this.props.tabs.map(function(tab, i) {
          return <TabItem tab={tab} changeSelected={this.props.changeSelected} selected={this.props.selectedTab == tab} key={i} id={i} remove_url={this.props.remove_url}/>;
        }.bind(this))}
      </ol>
    );
  }
}