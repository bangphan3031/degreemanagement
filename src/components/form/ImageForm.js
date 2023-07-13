import React from 'react';
import { FormControl } from '@mui/material'; //Avatar
// import  from 'path/to/default-avatar.jpg'; //DefaultImg

const ImageForm = () => {
  //{  }
  return (
    <FormControl>
      Image
      {/* <input id="avatar-input" name="avatar" type="file" onChange={handleFileChange} style={{ display: 'none' }} /> */}
      {/* <label htmlFor="avatar-input">
        {formik.values.avatar ? (
          <Avatar
            src={URL.createObjectURL(formik.values.avatar)}
            alt="Avatar"
            sx={{
              width: 200,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          />
        ) : (
          <Avatar
            src={DefaultImg}
            alt="Default Avatar"
            sx={{
              width: 200,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          />
        )}
      </label> */}
    </FormControl>
  );
};

// FormInput.propTypes = {
//   formik: PropTypes.object.isRequired,
//   handleFileChange: PropTypes.object.isRequired
// };

export default ImageForm;
