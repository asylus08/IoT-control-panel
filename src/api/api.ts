import axios from 'axios'

export async function testConnection(){
    try {
        const response = await axios.get('http://127.0.0.1:8080/test-connection');
        console.log('Response:', response.data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
