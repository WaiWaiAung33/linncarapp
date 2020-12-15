import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class RefuelCard extends React.Component {
    _onPress(){
        if(this.props.OnPress){
            this.props.OnPress();
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={{ textAlign: "right" }}>01-12-2020</Text>
          <View style={styles.secondContainer}>
      
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.text}>Car No</Text>
              <Text style={styles.text}>Dirver Name</Text>
              <Text style={styles.text}>Amount</Text>
              <Text style={styles.text}>Reason</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.text}>3Q/4451</Text>
              <Text style={styles.text}>U Kyaw Min Htun</Text>
              <Text style={styles.text}>22000</Text>
              <Text style={styles.text}>test</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={()=>this._onPress()}>
                <Image source={require("@images/edit.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
  text: {
    fontSize: 16,
    paddingTop: 5,
  },
  firstContainer: {
    marginLeft: 10,
    marginRight:10,
    marginTop:10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "#3D73D5",
  },
  secondContainer: {
    flexDirection: "row",
  },
});
