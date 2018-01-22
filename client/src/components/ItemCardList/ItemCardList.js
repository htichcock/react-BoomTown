import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard';
import './styles.css';

const ItemCardList = ({ itemsData, itemsFilters = [] }) => (
    <Masonry // default 'div'
        className="item-gallery"
        options={{
            transitionDuration: '0.5s'
        }}
    >
        {itemsFilters && itemsFilters.length
            ? itemsData
                .filter(item =>
                    item.tags.some(tag => itemsFilters.includes(tag))
                )
                .map(item => (
                    <div key={item.id} className="card-wrapper">
                        <ItemCard item={item} />
                    </div>
                ))
            : itemsData.map(item => (
                <div key={item.id} className="card-wrapper">
                    <ItemCard item={item} />
                </div>
            ))}
    </Masonry>
);
ItemCardList.propTypes = {
    itemsData: PropTypes.array.isRequired,
    itemsFilters: PropTypes.array
};
ItemCardList.defaultProps = {
    itemsFilters: []
};
export default ItemCardList;
