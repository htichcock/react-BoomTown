import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MD5 from 'crypto-js/md5';
import moment from 'moment';
import './styles.css';

const ItemCard = ({ item }) => (
    <Card key={item.id}>
        {item.borrower ? (
            <CardMedia
                className="media-overlay"
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
            subtitle={moment(item.created).fromNow()} // todo: Date passed since post moment.js
            avatar={`//www.gravatar.com/avatar/${MD5(
                item.itemowner.email
            ).toString()}.jpg`}
        />
        <CardTitle title={item.title} subtitle={item.tags.join(', ')} />
        <CardText>{item.description}</CardText>
        <CardActions>
            {!item.borrower && <RaisedButton secondary label="borrow" />}
        </CardActions>
    </Card>
);

export default ItemCard;
