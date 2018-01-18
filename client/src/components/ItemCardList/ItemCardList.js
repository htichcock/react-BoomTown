import React from 'react';
import Masonry from 'react-masonry-component';
import ItemCard from '../ItemCard';
import './styles.css';

const ItemCardList = ({ itemsData }) => (
    <Masonry // default 'div'
        className="item-gallery"
        options={{
            transitionDuration: '0.5s'
        }}
    >
        {itemsData.map(item => (
            <div key={item.id} className="card-wrapper">
                <ItemCard item={item} />
            </div>
        ))}
    </Masonry>
);

export default ItemCardList;
