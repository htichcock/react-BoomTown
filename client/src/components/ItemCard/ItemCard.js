import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MD5 from 'crypto-js/md5';
import moment from 'moment';
import './styles.css';

import mockCurrentUser from '../../mockCurrentUser';

const overlayLogic = item => {
    if (mockCurrentUser.id === item.itemowner.id) {
        return <CardTitle title={`Lent to ${item.borrower.fullname}`} />;
    } else if (mockCurrentUser.id === item.borrower.id) {
        return <CardTitle title={'You are borrowing this.'} />;
    }
    return <CardTitle title={'Unavailable'} />;
};

const ItemCard = ({ item }) => (
    <Card key={item.id}>
        {item.borrower ? (
            <CardMedia className="media-overlay" overlay={overlayLogic(item)}>
                <img src={item.imageurl} alt={item.title} />
            </CardMedia>
        ) : (
            <CardMedia>
                <img src={item.imageurl} alt={item.title} />
            </CardMedia>
        )}
        <Link to={`/profile/${item.itemowner.id}`}>
            <CardHeader
                title={item.itemowner.fullname}
                subtitle={moment(item.created).fromNow()} // todo: Date passed since post moment.js
                avatar={`//www.gravatar.com/avatar/${MD5(
                    item.itemowner.email
                ).toString()}.jpg`}
            />
        </Link>
        <CardTitle
            title={item.title}
            subtitle={item.tags.map(tag => tag.title).join(', ')}
        />
        <CardText>{item.description}</CardText>
        <CardActions>
            {!item.borrower && <RaisedButton secondary label="borrow" />}
        </CardActions>
    </Card>
);
ItemCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default ItemCard;
