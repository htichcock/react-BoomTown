import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Masonry from "react-masonry-component";
import FlatButton from "material-ui/FlatButton";
import PropTypes from "prop-types";

import moment from "moment";
const Items = ({ list }) => {
  return list.length ? (
    list.map(item => {
      return (
        <Card key={item.id}>
          {item.borrower ? (
            <CardMedia
              overlay={
                <CardTitle title={`Lent to ${item.borrower.fullname}`} />
              }
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
            subtitle={moment(item.created).fromNow()} //todo: Date passed since post moment.js
            avatar={item.itemowner.gravatarurl}
          />
          <CardTitle title={item.title} subtitle={item.tags.join(", ")} />
          <CardText>{item.description}</CardText>
          <CardActions>
            {!item.borrower && <FlatButton label="borrow" />}
          </CardActions>
        </Card>
      );
    })
  ) : (
    //insert loader....
    <div>Loading</div>
  );
};
Items.propTypes = {
  list: PropTypes.array.isRequired
};
export default Items;
