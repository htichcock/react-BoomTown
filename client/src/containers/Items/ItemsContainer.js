import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import Items from './Items';

const ItemsContainer = ({ data, itemsFilters }) => (
    <Items
        itemsData={data.items}
        isLoading={data.loading}
        itemsFilters={itemsFilters}
    />
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
        allTags {
            id
            title
        }
    }
`;
const mapStateToProps = state => ({
    itemsFilters: state.items.itemsFilters
});

export default connect(mapStateToProps)(graphql(fetchItems)(ItemsContainer));
