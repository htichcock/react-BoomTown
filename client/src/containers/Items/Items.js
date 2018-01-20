import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import ItemCardList from '../../components/ItemCardList';
import './styles.css';

const Items = ({ itemsData, itemsFilters, isLoading }) =>
    (!isLoading ? (
        <ItemCardList itemsFilters={itemsFilters} itemsData={itemsData} />
    ) : (
        <div className="loading-wrapper">
            <CircularProgress color="white" />
        </div>
    ));
Items.propTypes = {
    itemsData: PropTypes.array.isRequired
};
export default Items;
