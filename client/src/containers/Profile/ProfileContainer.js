import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { fetchItemsAndUsers } from '../../redux/modules/profile';

class ProfileContainer extends Component {
    static propTypes = {};
    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers(this.props.match.params.userId));
    }
    render() {
        return (
            <Profile
                userId={this.props.match.params.userId}
                profileItemsData={this.props.profileItemsData}
                isLoaded={this.props.isLoaded}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoaded: state.profile.isLoaded,
    profileItemsData: state.profile.profileItemsData,
    error: state.items.error
});
export default connect(mapStateToProps)(ProfileContainer);
