import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import { blueGrey900 } from 'material-ui/styles/colors';

const styles = {
    fieldStyle: {
        width: '100%'
    },
    errorStyle: {
        color: 'red',
        position: 'absolute',
        bottom: '-1rem'
    },
    underlineStyle: {
        borderColor: blueGrey900
    }
};

const ValidatedTextField = ({ label, value, handleChange, type, error }) => (
    <TextField
        value={value}
        type={type}
        errorText={error}
        onChange={e => {
            handleChange(e);
        }}
        style={styles.fieldStyle}
        hintText={label}
        floatingLabelText={label}
        errorStyle={styles.errorStyle}
        underlineFocusStyle={styles.underlineStyle}
    />
);

ValidatedTextField.propTypes = {
    label: PropTypes.string.isRequired
};

export default ValidatedTextField;
