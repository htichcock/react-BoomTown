import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import ItemCardList from '../../components/ItemCardList';
import './styles.css';

const ProfileHeader = ({ userId }) => (
    <Card>
        <CardHeader title={userId} />
    </Card>
);

const Items = ({ profileItemsData, isLoading, userId }) =>
    (!isLoading ? (
        <div style={{ width: '100%' }}>
            <ProfileHeader userId={userId} />
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
