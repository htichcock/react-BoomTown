import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profile from './Profile';
import { fetchItemsAndUsers } from '../../redux/modules/profile';
import NotFound from '../../components/NotFound/NotFound';

class ProfileContainer extends Component {
    static propTypes = {
        profileItemsData: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        profileUser: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers(this.props.match.params.userId));
    }
    render() {
        return this.props.profileUser.id || this.props.isLoading ? (
            <Profile
                profileItemsData={this.props.profileItemsData}
                user={this.props.profileUser}
                isLoading={this.props.isLoading}
            />
        ) : (
            <NotFound />
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
