import React, { Component } from "react";
import Items from "./Items";

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

export default class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    // todo: Fetch JSON and attach to state
    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());
    let newStateItems = [];

    Promise.all([items, users]).then(response => {
      //todo: merge two lists into single list.
      //attach the new list to state and pass into items as props
      //items should render the list
      let itemsArray = response[0];
      let usersArray = response[1];
      let userTable = {};
      usersArray.forEach(user => {
        userTable[user.id] = user;
      });
      newStateItems = itemsArray.map(item => {
        if (item.itemowner) {
          item.itemowner = userTable[item.itemowner];
        }
        if (item.borrower) {
          item.borrower = userTable[item.borrower];
        }
        return item;
      });
      console.log(newStateItems);
      this.setState({
        items: newStateItems
      });
    });
  }
  render() {
    return <Items list={this.state.items} />;
  }
}
