import { sendRequest } from 'utils/apiUtils';

export async function getRoles(params) {
  try {
    const response = await sendRequest(`Role/GetAllByParams?${params}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function createRole(data) {
  try {
    const response = await sendRequest('Role/Create', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function editRole(data) {
  try {
    const response = await sendRequest('Role/Update', 'PUT', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}
  
export async function deleteRole(roleId) {
  try {
    const response = await sendRequest(`Role/Delete?id=${roleId}`, 'DELETE');
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}