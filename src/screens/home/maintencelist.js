import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//import components
import MaintenceListCard from "@components/maintenceListCard";

export default class RefuelList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MaintenceListCard
          OnPress={() => this.props.navigation.navigate("EditMaintence")}
        />
        <MaintenceListCard />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreateMaintence")}
          >
            <Image source={require("@images/addblue.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
