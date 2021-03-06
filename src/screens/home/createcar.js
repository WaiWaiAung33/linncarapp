import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import ImgUploadBtn from "@components/ImgUploadBtn";
import SuccessModal from "@components/SuccessModal";
import ErrorText from "@components/ErrorText";
import LoadingModal from "@components/LoadingModal";

//import api
const axios = require("axios");
import { CarCreateApi, CarlistApi } from "@api/Url";
import FormData from "form-data";

export default class CreateCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirvername: "",
      startplace: "",
      usagename: "",
      reason: "",
      startkilo: "",
      //  car_id:null,
      //  carno:null,
      access_token: null,
      dirverid: null,
      imagePath: null,
      time: "",
      isOpenSuccessModel: false,
      ISERRORCAR: false,
      ISERRORSTARTPLACE: false,
      ISERRORNAME: false,
      ISERRORREASON: false,
      ISERRORKILO: false,
      ISERRORIMAGE: false,
      modalVisible: false,
      carno: { value: null, label: null },
      CARNO: []
    };
    this.page = 0;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const dirver = await AsyncStorage.getItem("userid");
    const dirvername = await AsyncStorage.getItem("name");
    // console.log("driver id", dirver);
    this.setState({
      access_token: access_token,
      dirverid: dirver,
      dirvername: dirvername,
      startkilo: this.props.navigation.getParam("data").end_kilo,
      carno: { value: this.props.navigation.getParam("data").id, label: this.props.navigation.getParam("data").car_no }
    });
    this._handleCarList();
    // console.log(this.props.navigation.getParam("car_id"));
    this.Clock = setInterval(() => this.GetTime(), 1000);
  }

  _handleCarList() {
    var self = this;
    axios
      .get(CarlistApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        }
      })
      .then(function (response) {
        // console.log(response.data);
        let data = response.data.car_list;
        let arr = [];
        data.map((data, index) => {
          if (data.status == 0 || data.id == self.state.carno.value) {
            var obj = {
              value: data.id.toString(),
              label: data.car_no
            };
            arr.push(obj);
          }

        });
        self.setState({ CARNO: arr });
      })
      .catch(function (err) {
        alert("Server Error");
        // console.log("Create Car List", err);
      })
  }


  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  _handleSelect(value, label) {
    this.setState({
      carno: { value: value, label: label }
    })
  }

  //gettime

  GetTime() {
    // Creating variables to hold time.
    var date, TimeType, hour, minutes, seconds, fullTime;

    // Creating Date() function object.
    date = new Date();

    // Getting current hour from Date object.
    hour = date.getHours();

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = "AM";
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = "PM";
    }

    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour == 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }

    //Getting current seconds from date object.
    seconds = date.getSeconds();

    // If seconds value is less than 10 then add 0 before seconds.
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }

    // Adding all the variables in fullTime variable.
    fullTime =
      hour.toString() +
      ":" +
      minutes.toString() +
      ":" +
      seconds.toString() +
      " " +
      TimeType.toString();

    // Setting up fullTime variable in State.
    this.setState({
      time: fullTime,
    });
  }



  //create car report
  _handleOnSave = async () => {
    let isError = false;
    if (this.state.startplace == "") {
      // alert("Helo");
      this.setState({ ISERRORSTARTPLACE: true });
      isError = true;
    }

    if (this.state.name == "") {
      // alert("Helo");
      this.setState({ ISERRORNAME: true });
      isError = true;
    }
    if (this.state.reason == "") {
      // alert("Helo");
      this.setState({ ISERRORREASON: true });
      isError = true;
    }
    if (this.state.imagePath == null) {
      // alert("Helo");
      this.setState({ ISERRORIMAGE: true });
      isError = true;
    }
    if (!isError) {
      const self = this;
      self.setState({ modalVisible: true });
      const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + self.state.access_token,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      const { imagePath } = self.state;
      formData.append("car_id", self.state.carno.value);
      formData.append("driver_id", self.state.dirverid);
      formData.append("start_place", self.state.startplace);
      formData.append("reason", self.state.reason);
      formData.append("usageName", self.state.usagename);
      formData.append("start_time", self.state.time);
      formData.append("start_kilo", self.state.startkilo);
      if (imagePath) {
        const uriPart = imagePath.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);

        formData.append("startKilo_photo", {
          uri: imagePath,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      // console.log(formData);
      axios
        .post(CarCreateApi, formData, {
          headers,
        })
        .then(function (response) {
          self.setState({ isOpenSuccessModel: true, modalVisible: false });
        })
        .catch(function (err) {
          // console.log(err);
          alert("Server Error");
          self.setState({ isOpenSuccessModel: false, modalVisible: false });
        });
    }
  };



  //image
  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri, ISERRORIMAGE: false });
  }

  //on close
  _handleOnClose() {
    this.setState({
      isOpenSuccessModel: false,
    });
    this.props.navigation.navigate("CarList");
  }

  render() {
    // console.log(this.state.carno.value);
    // alert(this.state.time);
    return (
      <View style={styles.container}>
        {/* <KeyboardAvoidingView
                // behavior="padding"
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
                // keyboardVerticalOffset={100}
                style={{ flex: 1 }}
              > */}
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Driver Name</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                // keyboardType="number-pad"
                style={styles.textInputStyle}
                value={this.state.dirvername}
                editable={false}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Car No</Text>
            </View>
            <View style={styles.textInputContainer}>
              <DropDown
                value={this.state.carno}
                widthContainer="100%"
                options={this.state.CARNO}
                onSelect={(value, label) => this._handleSelect(value, label)}
              />

            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Time</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.time}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
                editable={false}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Place</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.startplace}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
                onChangeText={(value) =>
                  this.setState({ startplace: value, ISERRORSTARTPLACE: false })
                }
              ></TextInput>

              <ErrorText
                errMessage="please enter start place"
                isShow={this.state.ISERRORSTARTPLACE}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Usage Name</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.usagename}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
                onChangeText={(value) =>
                  this.setState({ usagename: value, ISERRORNAME: false })
                }
              ></TextInput>
              <ErrorText
                errMessage="please enter usagename"
                isShow={this.state.ISERRORNAME}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Reson *</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.reason}
                // keyboardType="number-pad"
                style={styles.textAreaStyle}
                onChangeText={(value) =>
                  this.setState({ reason: value, ISERRORREASON: false })
                }
              ></TextInput>
              <ErrorText
                errMessage="please enter reason"
                isShow={this.state.ISERRORREASON}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Kilo</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.startkilo}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
                editable={false}
              // onChangeText={(value)=>this.setState({startkilo:value})}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Kilo Photo</Text>
            </View>
            <View style={{ flex: 1 }}>
              <ImgUploadBtn
                imagePath={this.state.imagePath}
                onChooseImage={this._handleOnChooseImage.bind(this)}
              />
              <ErrorText
                errMessage="please select photo"
                isShow={this.state.ISERRORIMAGE}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}></View>
            <View style={styles.btnContainer}>
              {/* <TouchableOpacity style={styles.backBtn}>
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => this._handleOnSave()}
              >
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <LoadingModal isOpenModal={this.state.modalVisible} />
        {/* </KeyboardAvoidingView> */}
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully car report created"
          onClose={() => this._handleOnClose()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textContainer: {
    width: "30%",
    // alignItems: "flex-end",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 15 },
  textInputStyle: {
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
  textAreaStyle: {
    borderColor: "#ffffff",
    borderWidth: 1,
    minHeight: 80,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
  },
  saveBtn: {
    backgroundColor: "#0470DD",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
