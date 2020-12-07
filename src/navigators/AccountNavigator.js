import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Login from "@screens/account/login";

export default createAppContainer(
    createStackNavigator(
        {
            Login:{
                screen:Login,
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