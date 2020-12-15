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
  AsyncStorage
 
} from "react-native";

const { height, width } = Dimensions.get("window");
import NetInfo from "@react-native-community/netinfo";

//import api
const axios = require("axios");
import { LoginApi } from "@api/Url";

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      access_token: "",
      user_id: "",
      pass: "",
      isOnline: false,
      editable: true,
    }
  }

  async componentDidMount() {
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ editable: true, user_id: null });
    });
    const userid = await AsyncStorage.getItem("loginID");
    const routeName = userid != null ? "Home" : "Login";
    this.props.navigation.navigate(routeName);
  }

  _handleLogin = async () => {
    var self = this;
    self.setState({
      editable: false,
    });
    if (this.state.isOnline) {
      if (this.state.user_id == null) {
        alert("Phone Number is required!");
        self.setState({ editable: true });
      } else {
        let appuser = {
          mobile: this.state.user_id,
        };

        axios
          .post(LoginApi, appuser)
          .then(function (response) {
            console.log(response.data);
            if (response.data.error == 0) {
              console.log("Lgoin",response.data);
              // alert(response.data.message);

              self.props.navigation.navigate("OTPCode", {
                userId: self.state.user_id,
                editable: true,
              });
            } else {
              alert(response.data.message);
              self.setState({ editable: true });
            }
          })
          .catch(function (error) {
            // console.log("Error:", error);
            alert("Something went wrong!");
            self.setState({ editable: true });
          });
      }
    } else {
      self.setState({ editable: true });
      alert("Please check your internet connection!");
    }
  };


  render() {
    // alert(this.state.locale);
    return (
    <View style={{flex:1,backgroundColor:"#CBD1E8"}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{justifyContent:"center",alignItems:"center",marginTop:15}}>
        <Image source={require("@images/logo.png")} style={{width:70,height:70}}/>
        </View>
        <Text style={{paddingTop:20,textAlignVertical:"center",textAlign:"center",
        color:"white",fontSize:18}}>Linn Car Report</Text>
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
              value={this.state.user_id}
              style={styles.textInput}
              placeholder="09 XXX XXX XXX"
              keyboardType="number-pad"
              onChangeText={(value) => this.setState({ user_id: value })}
             
            />
          </View>
          {/* <View
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
              secureTextEntry={true}
              value={this.state.pass}
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(value) => this.setState({ pass: value })}
            />
          </View> */}
          <TouchableOpacity
         onPress={() => this._handleLogin()}
        // onPress={()=>this.props.navigation.navigate("#")}
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
    height:200,
    borderWidth:1,
    borderColor:"#3D73D5",
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25
  },
  secondContainer: {
    height: 200,
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
