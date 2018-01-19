import React, { Component } from 'react';
import Profile from './Profile';
import MD5 from 'crypto-js/md5';
import moment from 'moment';

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

export default class ProfileContainer extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {
                id: 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2',
                email: 'mandi@redacademy.com',
                fullname: 'Mandi Wise',
                bio: "Learn 'em good."
            },
            itemsData: [],
            isLoaded: false
        };
    }
    generateGravatarURL(email) {
        return `//www.gravatar.com/avatar/${MD5(email).toString()}.jpg`;
    }
    generateTimeFromNow() {
        return moment(this.created).fromNow(); // this bound to item obj
    }
    componentDidMount() {
        // todo: Fetch JSON and attach to state
        const items = fetch(ITEMS_URL).then(r => r.json());
        const users = fetch(USERS_URL).then(r => r.json());
        let newItemsData = [];

        Promise.all([items, users]).then(response => {
            const itemsArray = response[0];
            const usersArray = response[1];

            const userTable = {};
            usersArray.forEach(user => {
                // add time from now and gravatarurl
                user.gravatarurl = this.generateGravatarURL(user.email);
                // generate userTable
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
            <Profile
                currentUser={this.state.currentUser}
                itemList={this.state.itemsData}
                isLoaded={this.state.isLoaded}
            />
        );
    }
}
