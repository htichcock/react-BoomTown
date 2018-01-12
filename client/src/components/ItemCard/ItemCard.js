import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const ItemCard = ({ item }) => (
  <Card key={item.id}>
    {item.borrower ? (
      <CardMedia
        overlay={<CardTitle title={`Lent to ${item.borrower.fullname}`} />}
      >
        <img src={item.imageurl} alt={item.title} />
      </CardMedia>
    ) : (
      <CardMedia>
        <img src={item.imageurl} alt={item.title} />
      </CardMedia>
    )}
    <CardHeader
      title={item.itemowner.fullname}
      subtitle={item.timeFromNowFunc(item.created)} //todo: Date passed since post moment.js
      avatar={item.itemowner.gravatarurl}
    />
    <CardTitle title={item.title} subtitle={item.tags.join(", ")} />
    <CardText>{item.description}</CardText>
    <CardActions>{!item.borrower && <FlatButton label="borrow" />}</CardActions>
  </Card>
);

export default ItemCard;
