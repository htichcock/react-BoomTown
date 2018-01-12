import React from "react";
import Masonry from "react-masonry-component";
import ItemCard from "../ItemCard";

const ItemCardList = ({ itemList }) => (
  <Masonry // default 'div'
    className="item-gallery"
    options={{
      transitionDuration: "0.5s"
    }}
  >
    {itemList.map(item => {
      return (
        <div key={item.id} className="card-wrapper">
          <ItemCard item={item} />
        </div>
      );
    })}
  </Masonry>
);

export default ItemCardList;
