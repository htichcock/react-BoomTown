import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Filter = ({ handleChange, values, data }) =>
    (data.loading ? (
        <SelectField
            disabled
            className="filter-select"
            hintText="Filter by Tag"
        />
    ) : (
        <SelectField
            multiple
            value={values}
            onChange={handleChange}
            className="filter-select"
            hintText="Filter by Tag"
        >
            {data.allTags.map(tag => (
                <MenuItem
                    insetChildren
                    key={tag.title}
                    checked={values && values.indexOf(tag.title) > -1}
                    value={tag.title}
                    label={tag.title}
                    primaryText={tag.title}
                />
            ))}
        </SelectField>
    ));

Filter.propTypes = {
    values: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
};
const fetchTags = gql`
    query fetchTags {
        allTags {
            title
        }
    }
`;

export default graphql(fetchTags)(Filter);
