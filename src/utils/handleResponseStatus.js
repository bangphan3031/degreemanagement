export async function handleResponseStatus(response, navigate) {
    if (response.statusCode === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('menu');
      navigate('/login');
      return false;
    } else if (response.statusCode >= 500) {
      navigate('/500');
      return false;
    } else if (response.statusCode === 403) {
      return false;
    }
  
    return true;
  }
  