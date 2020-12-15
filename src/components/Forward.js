import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, TouchableOpacity,StyleSheet} from "react-native";

export default class Back extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(this.props.routeName)}
      >
       
          <Image
          style={styles.img}
            source={require("@images/back_arrow.png")}
          />
   
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    img:{
        marginLeft:10,
        width:20,
        height:20
    }
})
