import { sendRequest } from 'utils/apiUtils';
//import { axiosClient } from './axiosClient';

export async function getFunctions(params) {
  try {
    const response = await sendRequest(`Function/GetAllByParams?${params}`, 'GET');
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating function:', error);
    throw error;
  }
}

export async function createFunction(data) {
  try {
    const response = await sendRequest('Function/Create', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function editFunction(data) {
  try {
    const response = await sendRequest('Function/Update', 'PUT', data);
    return response;
  } catch (error) {
    console.error('Error edit function:', error);
    throw error;
  }
}

export async function deleteFunction(functionId) {
  try {
    const response = await sendRequest(`Function/Delete?id=${functionId}`, 'DELETE');
    return response;
  } catch (error) {
    console.error('Error creating function:', error);
    throw error;
  }
}
