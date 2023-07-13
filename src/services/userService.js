import { sendRequest } from 'utils/apiUtils';

export async function getUsers(params) {
  try {
    const response = await sendRequest(`User/GetAllByParams?${params}`, 'GET', null);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const response = await sendRequest('User/Create', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}