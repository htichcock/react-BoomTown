import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import PropTypes from "prop-types";
import ItemCardList from "../../components/ItemCardList";
import "./styles.css";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

const ProfileHeader = ({ currentUser }) => (
  <Card>
    <CardHeader title={currentUser.fullname} />
  </Card>
);

const Items = ({ itemList, isLoaded, currentUser }) => {
  return isLoaded ? (
    <div style={{ width: "100%" }}>
      <ProfileHeader currentUser={currentUser} />
      <ItemCardList itemList={itemList} />
    </div>
  ) : (
    <div className="loading-wrapper">
      <CircularProgress color="white" />
    </div>
  );
};
Items.propTypes = {
  itemList: PropTypes.array.isRequired
};
export default Items;
