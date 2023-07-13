import React from 'react';
import { Grid, FormControl, TextField } from '@mui/material'; //InputLabel
import PropTypes from 'prop-types';
const InputForm = ({ formik, name, label, type, isFirst, isDisabled }) => {
  return (
    <Grid item xs={12} style={isFirst ? {} : { marginTop: '10px' }}>
      <FormControl fullWidth>
        <TextField
          id={name}
          name={name}
          fullWidth
          label={label}
          value={formik.values[name] || ''}
          onChange={formik.handleChange}
          variant="standard"
          placeholder={label}
          error={formik.touched[name] && formik.errors[name] ? true : false}
          // error={true}
          type={type}
          disabled={isDisabled}
        />
        {formik.touched[name] && formik.errors[name] && <div style={{ color: 'red', marginTop: '4px' }}>{formik.errors[name]}</div>}
      </FormControl>
    </Grid>
  );
};

InputForm.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  isDisabled: PropTypes.bool
};

export default InputForm;
