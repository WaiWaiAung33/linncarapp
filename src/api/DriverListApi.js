const axios = require('axios')

import { BaseUrl } from '@api/Url'
import { AsyncStorage } from "react-native";

export default class CarListApi {

    getAllDriverList = async () => {
        var access_token = await AsyncStorage.getItem("access_token");
        return axios.get(BaseUrl + 'getAllDriver', {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
    }

    getDriverListbyID = async (search) => {
        var access_token = await AsyncStorage.getItem("access_token");
        return axios.get(BaseUrl + 'getAllDriver?keyword=' + search, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
    }
}