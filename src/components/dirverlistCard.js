import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,Linking,Platform } from "react-native";

export default class DriverListCard extends React.Component {
  _OnPress() {
    if (this.props.OnPress) {
      this.props.OnPress();
    }
  }

  _handlePhoneCall(number) {
    let phoneNumber = "";

    if (Platform.OS === "android") {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.openURL(phoneNumber);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()}>
          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/driver.png")} style={{width:100,height:100}}/>
            </View>
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <Text style={styles.text}>{this.props.name}</Text>

              <Text style={styles.text}>{this.props.phone}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                flex: 1,
                paddingRight: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => this._handlePhoneCall(this.props.phone)}
              >
                <Image
                  source={require("@images/phone.png")}
                  style={{ width: 28, height: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: "#3D73D5",
  },
  circle: {
    width: 80,
    height: 80,
    backgroundColor: "#DCE6EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#DCE6EC",
  },
  text: {
    paddingTop: 10,
    fontSize: 16,
  },
});
