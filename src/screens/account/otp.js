import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from "react-native";
//import api
const axios = require("axios");
import { OTPApi, LoginApi } from "@api/Url";

const { height, width } = Dimensions.get("window");
export default class OTPCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "",
      second: "",
      third: "",
      four: "",
      five: "",
      six: "",
    };
    this.BackHandler = null;
  }
  async componentDidMount() {
    this.setBackHandler();
  }
  setBackHandler() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackButton.bind(this)
    );
  }
  _handleBackButton = () => {
    this.props.navigation.navigate("Login");
    return true;
  };
  UNSAFE_componentWillUnmount() {
    this.focusListener.remove();
  }
  handleChange(key, value, ref) {
    if (key == "first") {
      this.setState({ first: value });
    }
    if (key == "second") {
      this.setState({ second: value });
    }
    if (key == "third") {
      this.setState({ third: value });
    }
    if (key == "four") {
      this.setState({ four: value });
    }
    if (key == "five") {
      this.setState({ five: value });
    }
    if (key == "six") {
      this.setState({ six: value });
    }

    if (value.length === 0) {
      this.refs[ref - 1].focus();
    } else {
      this.refs[ref].focus();
    }
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  _handleProcessLogin = async () => {
    var otpcode =
      this.state.first +
      this.state.second +
      this.state.third +
      this.state.four +
      this.state.five +
      this.state.six;
    if (otpcode == null || otpcode.length < 6) {
      alert("Please fill valid 6 digit OTP Code !");
      return false;
    }

    // const sha1password = await Crypto.digestStringAsync(
    //   Crypto.CryptoDigestAlgorithm.SHA1,
    //   otpcode
    // );
    let appuser = {
      loginId: this.props.navigation.getParam("userId"),
      password: otpcode,
    };
    // console.log(appuser);
    var self = this;

    axios
      .post(OTPApi, appuser)
      .then(function (response) {
        // console.log("OTP",response.data);
        if (response.data.status == 1) {
          // alert(response.data.user.id.toString());
          if (response.data.status === 1) {
            var userid = response.data.user.driverId.toString();
            // console.log("User Id", userid);
            AsyncStorage.multiSet(
              [
                ["access_token", response.data.access_token],
                ["loginID", response.data.user.loginId],
                ["userid", userid],
                ["name", response.data.user.name],
              ],
              (err) => {
                if (err) {
                  alert("Asynstorage Error");
                } else {
                  self.props.navigation.navigate("Home");
                }
              }
            );
          } else {
            alert("Unauthorized");
            self.props.navigation.navigate("Login");
          }
        } else {
          alert("OTP Code is incorrect");
        }
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  resenOTPCode() {
    let appuser = {
      mobile: this.props.navigation.getParam("userId"),
    };
    var self = this;

    axios
      .post(LoginApi, appuser)
      .then(function (response) {
        // console.log("ResendCode",response.data);
        if (response.data.error == 0) {
          if (response.data.error == 0) {
            self.props.navigation.navigate("OTPCode");
          } else {
            alert(response.data.message);
          }
        }
        if (response.data.error == 1 && response.data.result == null) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.secondContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={require("@images/logo.png")}
              style={styles.imgHeader}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={styles.headerText}>
              {this.props.navigation.getParam("userId")}{" "}
              သို့ပို့ဆောင်လိုက်သောနံပါတ်
            </Text>
            <Text style={styles.headerText}>၆လုံးကို ရိုက်ထည့်ပါ</Text>
          </View>
        </View>
        {/* <View style={styles.thirdContainer}>
          <Text>09123456789 သို့ပို့ဆောင်လိုက်သောနံပါတ်</Text>
          <Text>၆လုံးကို ရိုက်ထည့်ပါ</Text>
        </View> */}
        <View style={styles.thirdContainer}>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("first", value, "2")}
            value={this.state.first}
            maxLength={1}
            returnKeyType="next"
            onSubmitEditing={() => this.focusNextField("2")}
            blurOnSubmit={false}
            ref="1"
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("second", value, "3")}
            maxLength={1}
            value={this.state.second}
            returnKeyType="next"
            ref="2"
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("third", value, "4")}
            maxLength={1}
            value={this.state.third}
            returnKeyType="next"
            ref="3"
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("four", value, "5")}
            maxLength={1}
            value={this.state.four}
            returnKeyType="next"
            ref="4"
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("five", value, "6")}
            maxLength={1}
            value={this.state.five}
            returnKeyType="next"
            ref="5"
          />
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(value) => this.handleChange("six", value, "6")}
            maxLength={1}
            value={this.state.six}
            returnKeyType="next"
            ref="6"
          />
        </View>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => this._handleProcessLogin()}
        >
          <Text style={styles.text}>Verify</Text>
        </TouchableOpacity>
        <View style={styles.textfooter}>
          <TouchableOpacity onPress={() => this.resenOTPCode()}>
            <Text style={{ color: "#308DCC", fontWeight: "bold" }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    height: height / 5,
    width: width,
    justifyContent: "center",
    // alignItems: "center"
  },
  secondContainer: {
    height: 300,
    backgroundColor: "#3D73D5",
    alignItems: "center",
  },
  imgHeader: {
    width: 80,
    height: 80,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imgContainer: {
    // backgroundColor: "white",
    // width: 120,
    // height: 120,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 65,
    marginTop: "10%",
  },
  thirdContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
  textInput: {
    height: 40,
    width: width / 9,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 5,
    borderColor: "#308DCC",
    elevation: 5,
    backgroundColor: "white",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "white",
    shadowOpacity: 0.5,
    textAlign: "center",
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touchBtn: {
    height: 40,
    borderWidth: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D73D5",
    borderColor: "#3D73D5",
    borderRadius: 5,
    elevation: 5,
    //   backgroundColor:"white",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "white",
    shadowOpacity: 0.5,
    marginTop: 20,
  },
  text: {
    color: "white",
  },
  textfooter: {
    alignItems: "flex-end",
    //   marginTop:"15%",
    margin: 20,
  },
});
