import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Login from "@screens/account/login";
import OTPCode from "@screens/account/otp";

export default createAppContainer(
    createStackNavigator(
        {
            Login:{
                screen:Login,
                navigationOptions:({navigation})=>({
                    headerShown:false
                })
            },
            OTPCode:{
                screen:OTPCode,
                navigationOptions:({navigation})=>({
                    headerShown:false
                })
            },
        },
        {
            initialRouteName:"Login"
        }
    )
)