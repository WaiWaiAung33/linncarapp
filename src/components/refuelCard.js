import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Moment from "moment";
import { ImguploadApi } from "@api/Url";

export default class RefuelCard extends React.Component {
    _onPress(){
        if(this.props.OnPress){
            this.props.OnPress();
        }
    }
  render() {
    // console.log(ImguploadApi + this.props.photo,);
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={{ textAlign: "right" }}> {Moment(this.props.date).format("DD-MM-YYYY")}</Text>
          <View style={styles.secondContainer}>
            <View>
              <Image
                  source={{
                    uri:
                     ImguploadApi + this.props.photo
                  }}
                style={{ width: 100,height:100 }}
              />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.text}>Car No</Text>
              <Text style={styles.text}>Kilo</Text>
              <Text style={styles.text}>Price</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.text}>{this.props.carno}</Text>
              <Text style={styles.text}>{this.props.kilo}</Text>
              <Text style={styles.text}>{this.props.price}</Text>
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
