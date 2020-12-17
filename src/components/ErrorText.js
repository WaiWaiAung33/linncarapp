import React from "react";
import { Text, StyleSheet,Image,View } from "react-native";

export default class ErrorText extends React.Component {
  render() {
    return this.props.isShow ? (
    //   <View style={styles.container}>
    //   <Image source={require("@images/error.png")} style={{width:20,height:20}}/>
    //   </View>
      <Text style={styles.errText}>{this.props.errMessage}</Text>
    //   <Text style={styles.errText}>{this.props.errText}</Text>
    ) : null;
  }
}

const styles = StyleSheet.create({
  errText: {
    color: "red",
    // fontFamily: Fonts.primary,
    fontSize: 14
  },
  container:{
    alignItems:"flex-end"
  }
});
