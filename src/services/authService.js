import { sendRequest } from 'utils/apiUtils';

export async function login(data) {
  try {
    const response = await sendRequest(`Auth/login`, 'POST', data);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}