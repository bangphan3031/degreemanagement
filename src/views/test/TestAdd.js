import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid, Avatar } from '@mui/material';
import DefaultImg from '../../assets/images/users/default.png';
import { useFormik } from 'formik';
import { userValidationSchema } from '../../components/validations/userValidation';
import { createUser } from 'services/userService';
import { addUser, setOpenPopup, showAlert } from 'store/actions';
import { useDispatch } from 'react-redux';

const AddUserForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const addedUsers = await createUser(values);
        console.log(addedUsers);
        dispatch(addUser(addedUsers.data));
        dispatch(showAlert(new Date().getTime().toString(), 'success', addedUsers.message));
      } catch (error) {
        console.error(error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  const handleFileChange = (e) => {
    formik.setFieldValue('avatar', e.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            /> {formik.touched.name && formik.errors.name && (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            )}
          </FormControl>
          <FormControl fullWidth sx={{marginTop: '10px'}}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <Input
              id="email-input"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && 
            (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
          </FormControl>
          <FormControl fullWidth sx={{marginTop: '10px', marginBottom: '10px'}}>
            <InputLabel htmlFor="phone-input">Phone</InputLabel>
            <Input
              id="phone-input"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && formik.errors.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div style={{ color: 'red' }}>{formik.errors.phone}</div>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{marginRight: '10px'}}>
            Save
          </Button>
          <Button type="button" variant="contained" color="primary" onClick={formik.resetForm}>
            Clear
          </Button>
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControl>
            <input
              id="avatar-input"
              name="avatar"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="avatar-input">
              {formik.values.avatar ? (
                <Avatar
                  src={URL.createObjectURL(formik.values.avatar)}
                  alt="Avatar"
                  sx={{
                    width: 200,
                    height: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
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
                    cursor: 'pointer',
                  }}
                />
              )}
            </label>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUserForm;
