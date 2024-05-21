import axios from "axios";

//  States API

export const getState = async () => {
    try {
        const response = await axios.get('https://apnasapna.world/api/web/get-states');
        const data = response.data.data;
        const jsonArray = Object.entries(data);
        return jsonArray;
    } catch (error) {
        console.error(error);
    }
}

//  Cities API

export const getCity = async () => {
    try {
        const response = await axios.post('https://apnasapna.world/api/web', );
        const data = response.data.data;
        const jsonArray1 = Object.entries(data);
        return jsonArray1;
    } catch (error) {
        console.error(error);
    }
}