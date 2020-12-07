import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Home from "@screens/home/home";

export default createAppContainer(
    createStackNavigator(
        {
            Home:{
                screen:Home,
                navigationOptions:({navigation})=>({
                    headerShown:false
                })
            },
        },
        {
            initialRouteName:"Home"
        }
    )
)