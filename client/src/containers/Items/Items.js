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
import PropTypes from "prop-types";

const Items = ({ list }) => {
  return list.length ? (
    <div>
      {list.map(item => {
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
              subtitle="Subtitle" //todo: Date passed since post moment.js
              avatar="https://www.gravatar.com/avatar/3391cb8fba76063554633df6f0cbb0d9.jpg" //todo: gravatar
            />
            <CardTitle title={item.title} subtitle={item.tags.join(", ")} />
            <CardText>{item.description}</CardText>
            <CardActions>
              {!item.borrower && <FlatButton label="borrow" />}
            </CardActions>
          </Card>
        );
      })}
    </div>
  ) : (
    //insert loader....
    <div>Loading</div>
  );
};
Items.propTypes = {
  list: PropTypes.array.isRequired
};
export default Items;
