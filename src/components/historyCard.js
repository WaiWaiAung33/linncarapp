import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Moment from "moment";

import { ImgCaruploadApi } from "@api/Url";

export default class HistoryCard extends React.Component {
  _onPress() {
    if (this.props.OnPress) {
      this.props.OnPress();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._onPress()}>
          <View style={styles.secondContainer}>
            {this.props.photo ? (
              <Image
                source={{
                  uri: ImgCaruploadApi + this.props.photo,
                }}
                style={{width:80,height:80,borderRadius:40}}
              />
           
            ) : (
              <View style={styles.circle}>
                <Image source={require("@images/car.png")} />
              </View>
            )}

            <View style={{ justifyContent: "center", paddingLeft: 10 }}>
              <Text>{this.props.carno}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <Text>{Moment(this.props.date).format("DD-MM-YYYY")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  secondContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#3D73D5",
    borderRadius: 5,
    padding: 5,
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
});
