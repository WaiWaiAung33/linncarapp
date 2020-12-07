import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AccountNavigator from "./AccountNavigator";
import HomeNavigator from "./HomeNavigator";

export default createAppContainer(
    createSwitchNavigator(
        {
            AccountNavigator:{
                screen:AccountNavigator
            },
            HomeNavigator:{
                screen:HomeNavigator
            }
        },
        {
            initialRouteName:"AccountNavigator"
        }
    )
)