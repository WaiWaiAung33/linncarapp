import React from "react";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

//import components
import Forward from "@components/Forward";

//import screen
import Home from "@screens/home/home";
import CarList from "@screens/home/carlist";
import CarDetail from "@screens/home/cardetail";
import CarUse from "@screens/home/caruse";
import CreteCar from "@screens/home/createcar";
import RefuelList from "@screens/home/refuellist";
import EditRefuel from "@screens/home/editrefuel";
import MaintenceList from "@screens/home/maintencelist";
import CreateRefuel from "@screens/home/createrefuel";
import CreateMaintence from "@screens/home/createmaintence";
import EditMaintence from "@screens/home/editmaintence";
import History from "@screens/home/history";
import HistoryDetail from "@screens/home/historydetail";
import DriverList from "@screens/home/dirverlist";
import dirverlistdetail from "@screens/home/diverlistdetail";

export default createAppContainer(
    createStackNavigator(
        {
            Home:{
                screen:Home,
                navigationOptions:({navigation})=>({
                    headerShown:false
                })
            },
            CarList:{
                screen:CarList,
                navigationOptions:({navigation})=>({
                    headerTitle:"Car List",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="Home" />
                }),
            },
            CarDetail:{
                screen:CarDetail,
                navigationOptions:({navigation})=>({
                    headerTitle:"Car Detail",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="CarList" />
                }),
            },
            CarUse:{
                screen:CarUse,
                navigationOptions:({navigation})=>({
                    headerTitle:"Using",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="CarList" />
                }),
            },
            CreteCar:{
                screen:CreteCar,
                navigationOptions:({navigation})=>({
                    headerTitle:"Create Car",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="CarList" />
                }),
            },
            RefuelList:{
                screen:RefuelList,
                navigationOptions:({navigation})=>({
                    headerTitle:"Refuel Car List",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="Home" />
                }),
            },
            EditRefuel:{
                screen:EditRefuel,
                navigationOptions:({navigation})=>({
                    headerTitle:"Update Refuel Data",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="RefuelList" />
                }),
            },
            CreateRefuel:{
                screen:CreateRefuel,
                navigationOptions:({navigation})=>({
                    headerTitle:"Create Refuel",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="RefuelList" />
                }),
            },
            
            MaintenceList:{
                screen:MaintenceList,
                navigationOptions:({navigation})=>({
                    headerTitle:"Maintenance List",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="Home" />
                }),
            },
           
            CreateMaintence:{
                screen:CreateMaintence,
                navigationOptions:({navigation})=>({
                    headerTitle:"Create Maintenance Data",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="MaintenceList" />
                }),
            },

            EditMaintence:{
                screen:EditMaintence,
                navigationOptions:({navigation})=>({
                    headerTitle:"Maintenance",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="MaintenceList" />
                }),
            },

            History:{
                screen:History,
                navigationOptions:({navigation})=>({
                    headerTitle:"History",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="Home" />
                }),
            },

            HistoryDetail:{
                screen:HistoryDetail,
                navigationOptions:({navigation})=>({
                    headerTitle:"History",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="History" />
                }),
            },

            DriverList:{
                screen:DriverList,
                navigationOptions:({navigation})=>({
                    headerTitle:"Driver List",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="Home" />
                }),
            },

            dirverlistdetail:{
                screen:dirverlistdetail,
                navigationOptions:({navigation})=>({
                    headerTitle:"Driver List Detail",
                    headerStyle: {
                              backgroundColor: "#3D73D5",
                            },
                    headerTitleStyle: {
                              color: "#ffffff",
                            },
                    headerLeft:()=> <Forward navigation={navigation} routeName="DriverList" />
                }),
            },
            
        },
        {
            initialRouteName:"Home"
        }
    )
)