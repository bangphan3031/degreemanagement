import { sendRequest } from 'utils/apiUtils';

export async function getAction(id, params) {
  console.log(id);
  try {
    const response = await sendRequest(`FunctionAction/${id}?${params}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error creating function:', error);
    throw error;
  }
}
export async function createAction(data) {
  try {
    const response = await sendRequest('FunctionAction/Create', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function editAction(data) {
  try {
    const response = await sendRequest('FunctionAction/Update', 'PUT', data);
    return response;
  } catch (error) {
    console.error('Error edit function:', error);
    throw error;
  }
}

export async function deleteAction(functionactionId) {
  try {
    const response = await sendRequest(`FunctionAction/Delete?id=${functionactionId}`, 'DELETE');
    return response;
  } catch (error) {
    console.error('Error creating function:', error);
    throw error;
  }
}
