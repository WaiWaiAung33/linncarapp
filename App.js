import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import RootNavigator from "@navigators/RootNavigator";

export default class App extends React.Component {
  render() {
      return (
       
          <RootNavigator />
      
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
