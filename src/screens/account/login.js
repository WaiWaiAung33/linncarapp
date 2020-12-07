import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
 
} from "react-native";

const { height, width } = Dimensions.get("window");
export default class Login extends React.Component {
  render() {
    // alert(this.state.locale);
    return (
    <View style={{flex:1,backgroundColor:"#CBD1E8"}}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.thirdContainer}>
          <Text style={styles.headerText}>
            {/* {" "} */}
            Car Login
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={styles.textinputImg}>
              <Image source={require("@images/phone.png")} />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="09 XXX XXX XXX"
              keyboardType="number-pad"
             
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View style={styles.textinputImg}>
              <Image source={require("@images/pass.png")} />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate("Home")}
            style={styles.touchBtn}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#3D73D5",
    height:350
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#308DCC",
    // alignItems: "center",
    // flexDirection:"row",
    // justifyContent:"space-between"
  },
  img: {
    width: 110,
    height: 110,
    // padding:2
  },
  imgContainer: {
    backgroundColor: "white",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 95,
    // marginTop: "10%",
  },
  thirdContainer: {
    backgroundColor: "white",
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    position: "absolute",
    marginTop: "70%",
    borderColor: "#E3EEF5",
    width: "95%",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    paddingBottom: 40,
  },
  headerText: {
    textAlign: "center",
    fontSize:18
  },
  textInput: {
    // margin: 10,
    borderWidth: 1,
    padding: 8,
    // borderRadius: 5,
    backgroundColor: "white",
    borderColor: "white",
    width: "85%",
    height: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    // shadowColor
  },
  textinputImg: {
    backgroundColor: "white",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: "#308DCC",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  touchBtn: {
    //  margin:10,
    width: "100%",
    height: 40,
    backgroundColor: "#3D73D5",
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
