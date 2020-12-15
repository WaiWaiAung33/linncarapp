import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

import RootNavigator from "@navigators/RootNavigator";

export default class App extends React.Component {
  render() {
      return (
        <MenuProvider>
          <RootNavigator />
          </MenuProvider>
      
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
