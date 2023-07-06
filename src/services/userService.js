import { ADD_USER, DELETE_USER, UPDATE_USER, setUsers } from '../store/actions';
import { store } from '../store/index';

export async function getUsers() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v2/user');

    if (!response.ok) {
      throw new Error('Error retrieving users');
    }

    const data = await response.json();
    store.dispatch(setUsers(data));
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v2/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error adding user');
    }

    const addedUser = await response.json();
    store.dispatch({ type: ADD_USER, user: addedUser });
    return addedUser;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export async function editUser(userId, data) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error updating user');
    }

    const updatedUser = await response.json();
    store.dispatch({ type: UPDATE_USER, user: updatedUser });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/user/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting user');
    }

    const deletedUser = await response.json();
    store.dispatch({ type: DELETE_USER, userId: deletedUser.id });
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

