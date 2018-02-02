import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Items from './Items';

const ItemsContainer = ({ data }) => (
    <Items itemsData={data.items} isLoading={data.loading} />
);

Items.propTypes = {
    data: PropTypes.object.isRequired
};

const fetchItems = gql`
    query fetchItems {
        items {
            id
            title
            description
            itemowner {
                id
                fullname
                email
            }
            borrower {
                id
                fullname
            }
            imageurl
            created
            tags {
                id
                title
            }
        }
    }
`;

export default graphql(fetchItems)(ItemsContainer);
