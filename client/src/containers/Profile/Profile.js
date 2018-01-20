import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import ItemCardList from '../../components/ItemCardList';
import ProfileHeader from '../../components/ProfileHeader';
import './styles.css';

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
