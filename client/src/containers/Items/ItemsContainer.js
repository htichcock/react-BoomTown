import React, { Component } from "react";
import Items from "./Items";
import MD5 from "crypto-js/md5";
import moment from "moment";

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

export default class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      itemsData: [],
      isLoaded: false
    };
  }
  generateGravatarURL(email) {
    return `//www.gravatar.com/avatar/${MD5(email).toString()}.jpg`;
  }
  generateTimeFromNow() {
    return moment(this.created).fromNow(); //this bound to item obj
  }
  componentDidMount() {
    // todo: Fetch JSON and attach to state
    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());
    let newItemsData = [];

    Promise.all([items, users]).then(response => {
      let itemsArray = response[0];
      let usersArray = response[1];

      let userTable = {};
      usersArray.forEach(user => {
        //add time from now and gravatarurl
        user.gravatarurl = this.generateGravatarURL(user.email);
        //generate userTable
        userTable[user.id] = user;
      });

      newItemsData = itemsArray.map(item => {
        if (item.itemowner) {
          item.itemowner = userTable[item.itemowner];
        }
        if (item.borrower) {
          item.borrower = userTable[item.borrower];
        }
        item.timeFromNowFunc = this.generateTimeFromNow.bind(item);
        return item;
      });
      this.setState({
        itemsData: newItemsData,
        isLoaded: true
      });
    });
  }
  render() {
    return (
      <Items itemList={this.state.itemsData} isLoaded={this.state.isLoaded} />
    );
  }
}
