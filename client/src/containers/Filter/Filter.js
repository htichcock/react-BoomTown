import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Filter = ({ handleChange, values, itemsMaster, isLoaded }) =>
    (!isLoaded ? (
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
            {itemsMaster
                .map(item => item.tags)
                .join()
                .split(',')
                .reduce(
                    (accu, curr) =>
                        (accu.includes(curr) ? accu : accu.concat(curr)),
                    []
                )
                .map(tag => (
                    <MenuItem
                        insetChildren
                        key={tag}
                        checked={values && values.indexOf(tag) > -1}
                        value={tag}
                        label={tag}
                        primaryText={tag}
                    />
                ))}
        </SelectField>
    ));

Filter.propTypes = {
    itemsMaster: PropTypes.array.isRequired
};
export default Filter;
