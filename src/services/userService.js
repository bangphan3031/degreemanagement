import { sendRequest } from 'utils/apiUtils';
import { axiosClient } from './axiosClient';

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
    const response = await axiosClient('User/Create', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function updateUser(data) {
  try {
    const response = await axiosClient('User/Update', 'PUT', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axiosClient(`User/Delete?id=${userId}`, 'DELETE');
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function deActiveUser(userId) {
  try {
    const response = await axiosClient(`User/DeActive?id=${userId}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function activeUser(userId) {
  try {
    const response = await axiosClient(`User/Active?id=${userId}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function getRolesViaUser(id, params) {
  try {
    const response = await sendRequest(`User/GetRolesViaUser/${id}?${params}`, 'GET', null);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

export async function saveUserRole(data) {
  try {
    const response = await axiosClient('User/SaveUserRole', 'POST', data);
    return response;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}
