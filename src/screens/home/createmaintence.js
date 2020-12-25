import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import ImgUploadBtn from "@components/ImgUploadBtn";
import SuccessModal from "@components/SuccessModal";
import ErrorText from "@components/ErrorText";
import LoadingModal from "@components/LoadingModal";

//import api
const axios = require("axios");
import { createmaintenceapi, CarlistApi } from "@api/Url";
import FormData from "form-data";

export default class CreateMaintence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      dirvername: null,
      amount: null,
      reason: null,
      imagePath: null,
      dirverid: null,
      isOpenSuccessModel: false,
      ISERRORREASON: false,
      ISERRORPRICE: false,
      ISERRORIMAGE: false,
      modalVisible: false,
      carno: { value: null, label: null },
      CARNO: []
    };
    this.page = 0;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const dirvername = await AsyncStorage.getItem("name");
    const dirver = await AsyncStorage.getItem("userid");
    this.setState({
      access_token: access_token,
      dirvername: dirvername,
      dirverid: dirver,
      carno: { value: this.props.navigation.getParam("car_id"), label: this.props.navigation.getParam("carno") }
    });

    this._handleCarList();


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
        console.log("Create Maintenance Car List", err);
      })
  }

  //create car report
  _handleOnSave = async () => {
    let isError = false;

    if (this.state.amount == null) {
      // alert("Helo");
      this.setState({ ISERRORPRICE: true });
      isError = true;
    }
    if (this.state.reason == null) {
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
      formData.append("car_no", self.state.carno.value);
      formData.append("driver_name", self.state.dirverid);
      formData.append("reason", self.state.reason);
      formData.append("amount", self.state.amount);
      if (imagePath) {
        const uriPart = imagePath.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);

        formData.append("vPhoto", {
          uri: imagePath,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      // console.log(formData);
      const url = createmaintenceapi;
      // console.log(url);
      axios
        .post(createmaintenceapi, formData, {
          headers,
        })
        .then(function (response) {
          // console.log(response.data);
          self.setState({ isOpenSuccessModel: true, modalVisible: false });
        })
        .catch(function (err) {
          console.log("Create Maintenance Error", err);
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
    this.props.navigation.navigate("MaintenceList");
  }

  _handleSelect(value, label) {
    this.setState({
      carno: { value: value, label: label }
    })
  }

  render() {
    return (
      <View style={styles.container}>
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
            <Text style={styles.labelStyle}>Dirver Name</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.dirvername}
              editable={false}
              // keyboardType="number-pad"
              style={styles.textInputStyle}
            ></TextInput>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.labelStyle}>Amount</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.amount}
              // keyboardType="number-pad"
              style={styles.textInputStyle}
              onChangeText={(value) =>
                this.setState({ amount: value, ISERRORPRICE: false })
              }
            ></TextInput>
            <ErrorText
              errMessage="please enter price"
              isShow={this.state.ISERRORPRICE}
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
            <Text style={styles.labelStyle}>Voucher</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ImgUploadBtn
              imagePath={this.state.imagePath}
              onChooseImage={this._handleOnChooseImage.bind(this)}
            />
            <ErrorText
              errMessage="please choose photo"
              isShow={this.state.ISERRORIMAGE}
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}></View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => this._handleOnSave()}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LoadingModal isOpenModal={this.state.modalVisible} />

        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully maintenance created"
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
