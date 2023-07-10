import config from '../config';

const apiUrl = config.apiUrl;
const secretKey = config.secretKey;
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const md5 = require('md5');

export async function getRoles(params) {
  try {
    const response = await fetch(`${apiUrl}/Role/GetAllByParams?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        'Token': user && token ? `${user}.${token}.${md5(token + secretKey)}` : null,
        'Accept-Language': 'vi-VN'
      },
    });
    if (!response.ok) {
      throw new Error('Error retrieving users');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

export async function createRole(data) {
  try {
    const body = JSON.stringify(data);
    const response = await fetch(`${apiUrl}/Role/Create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Token': user && token ? `${user}.${token}.${md5(token + body + secretKey)}` : null,
      'Accept-Language': 'vi-VN'
    },
    body: body
    });

    if (response.isSuccess == false) {
      const response = await response.message;
    }

    const addedRole = await response.json();
    return addedRole;
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
}

export async function editRole(data) {
  try {
    const body = JSON.stringify(data);
    const response = await fetch(`${apiUrl}/Role/Update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Token': user && token ? `${user}.${token}.${md5(token + body + secretKey)}` : null,
        'Accept-Language': 'vi-VN'
      },
      body: body
    });

    if (response.isSuccess == false) {
      const response = await response.message;
    }

    const updatedRole = await response.json();
    return updatedRole;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
}
  
export async function deleteRole(roleId) {
  try {
    const response = await fetch(`${apiUrl}/Role/Delete?id=${roleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Token': user && token ? `${user}.${token}.${md5(token + secretKey)}` : null,
        'Accept-Language': 'vi-VN'
      },
    });

    if (response.isSuccess == false) {
      const response = await response.message;
    }
    
    const deletedRole = await response.json();
    return deletedRole;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
}

export async function login(data) {
  try {
    const response = await fetch(`${apiUrl}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'vi-VN'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const loggedInUser = await response.json();
      return loggedInUser;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}