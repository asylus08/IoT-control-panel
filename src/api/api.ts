import axios from 'axios'

const url = "http://10.166.30.126:5000/";

export async function testConnection() {
    try {
        const response = await axios.get(`${url}test-connection`);
        console.log('Response:', response.data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function triggerDoorAction(action: string) {
    try {
        const response = await axios.post(`${url}actions/door`, {
            action: action
        });

        if (response.status === 200) {
            console.log('Success:', response.data.message);
            return response.data;
        } else {
            console.error('Unexpected response:', response);
            return { success: false, error: 'Unexpected response from server' };
        }
    } catch (error: any) {
        console.error('Error triggering door action:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Network or server error'
        };
    }
}

export async function triggerAlarmAction(action: string) {
    try {
        const response = await axios.post(`${url}actions/alarm`, {
            action: action
        });

        if (response.status === 200) {
            console.log('Success:', response.data.message);
            return response.data;
        } else {
            console.error('Unexpected response:', response);
            return { success: false, error: 'Unexpected response from server' };
        }
    } catch (error: any) {
        console.error('Error triggering alarm action:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Network or server error'
        };
    }
}

export async function triggerAdjustTemp(action: string) {
    try {
        const response = await axios.post(`${url}actions/temperature`, {
            action: action
        });

        if (response.status === 200) {
            console.log('Success:', response.data.message);
            return response.data;
        } else {
            console.error('Unexpected response:', response);
            return { success: false, error: 'Unexpected response from server' };
        }
    } catch (error: any) {
        console.error('Error triggering temp action:', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Network or server error'
        };
    }
}

export async function triggerTestMode() {
    try {
        const response = await axios.post(`${url}settings/test-mode`);

        if (response.status === 200) {
            console.log('Success:', response.data.message);
            return response.data;
        } else {
            console.error('Unexpected response:', response);
            return { success: false, error: 'Unexpected response from server' };
        }
    } catch (error: any) {
        console.error('Error enabling/disabling test-mode', error);
        return {
            success: false,
            error: error.response?.data?.error || 'Network or server error'
        };
    }
}