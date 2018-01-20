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
                user={this.props.profileUser}
                isLoading={this.props.isLoading}
            />
        );
    }
}
const mapStateToProps = state => ({
    isLoading: state.profile.isLoading,
    profileItemsData: state.profile.profileItemsData,
    profileUser: state.profile.profileUser,
    error: state.items.error
});
export default connect(mapStateToProps)(ProfileContainer);
