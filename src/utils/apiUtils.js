import config from '../config';

const apiUrl = config.apiUrl;
const secretKey = config.secretKey;

const md5 = require('md5');

export async function sendRequest(url, method, data) {
    try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const body = data == null ? '' : JSON.stringify(data);
        const response = await fetch(`${apiUrl}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Token': user && token ? `${user}.${token}.${md5(token + body + secretKey)}` : `${user}.${token}`,
                'Accept-Language': 'vi-VN'
            },
            body: JSON.stringify(data)
        });
    
        if (response.isSuccess == false) {
            const response = await response.message;
        }
        
        return response.json();
    } catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
}
  