import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import ItemCardList from '../../components/ItemCardList';
import './styles.css';

import MD5 from 'crypto-js/md5';
import Avatar from 'material-ui/Avatar';

const ProfileHeader = ({ user }) => (
    <Paper
        style={{ maxWidth: '800px', margin: '40px auto 32px', padding: '32px' }}
    >
        <div className="user-profile">
            <div className="user-profile-bio">
                <h2 className="user-name">{user.fullname}</h2>
                <p className="user-bio">{user.bio}</p>
            </div>

            <div className="user-info">
                <div className="user-stats">
                    <p>
                        <span className="num-of-items">{user.shared}</span>
                        {' Items Shared'}
                    </p>
                    <p>
                        <span className="num-of-items">{user.borrowed}</span>
                        {' Items Borrowed'}
                    </p>
                </div>
                <div className="profile-avatar-wrapper">
                    <Avatar
                        src={`//www.gravatar.com/avatar/${MD5(
                            user.email
                        ).toString()}?s=180`}
                        size={180}
                    />
                </div>
            </div>
        </div>
    </Paper>
);

const Items = ({ profileItemsData, isLoading, user }) =>
    (!isLoading ? (
        <div style={{ width: '100%' }}>
            <ProfileHeader user={user} />
            <ItemCardList itemsData={profileItemsData} />
        </div>
    ) : (
        <div className="loading-wrapper">
            <CircularProgress color="white" />
        </div>
    ));
Items.propTypes = {
    itemList: PropTypes.array.isRequired
};
export default Items;
