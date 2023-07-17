import React from 'react';
import { Avatar, FormControl } from '@mui/material'; //Avatar
import DefaultImg from '../../assets/images/users/default.png'; //DefaultImg
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageForm = ({ formik, name, nameFile, isImagePreview, urlImage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [noImagePreview, setNoImagePreview] = useState(isImagePreview);
  const [imageCurrent, setImageCurrent] = useState(urlImage);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNoImagePreview(false);
      setImageCurrent(false);
      formik.setFieldValue(nameFile, file);
      formik.setFieldValue(name, file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (isImagePreview) {
      setNoImagePreview(true);
    }
  }, [isImagePreview]);

  useEffect(() => {
    if (urlImage) {
      setImageCurrent(true);
    }
  }, [urlImage]);

  return (
    <FormControl>
      <input id={nameFile} name={nameFile} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      <label htmlFor={nameFile}>
        {imageCurrent ? (
          <Avatar
            src={urlImage}
            alt={name}
            sx={{
              width: 200,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          />
        ) : imagePreview && noImagePreview == false ? (
          <Avatar
            src={imagePreview}
            alt={name}
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
      </label>
    </FormControl>
  );
};

ImageForm.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string,
  nameFile: PropTypes.string.isRequired,
  isImagePreview: PropTypes.bool,
  urlImage: PropTypes.string
};

export default ImageForm;
