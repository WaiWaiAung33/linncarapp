const axios = require('axios')

import { BaseUrl } from '@api/Url'
import { AsyncStorage } from "react-native";

export default class CarListApi {
    
  getAllCarList = async () =>  {
    var access_token = await AsyncStorage.getItem("access_token");
    return axios.get(BaseUrl + 'carlists', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
  }

  getCarListbyID = async (search) => {
    var access_token = await AsyncStorage.getItem("access_token");
    return axios.get(BaseUrl +'carlists?keyword='+ search,{
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
  }
}