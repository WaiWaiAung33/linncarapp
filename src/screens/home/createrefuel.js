import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
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
import { CreateRefuelApi , CarlistApi} from "@api/Url";
import FormData from "form-data";

export default class CreateRefuel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      dirvername: null,
      Kilo: null,
      price: null,
      imagePath: null,
      dirverid: null,
      isOpenSuccessModel: false,
      ISERRORKILO: false,
      ISERRORPRICE: false,
      ISERRORIMAGE: false,
      ISERRORCAR:false,
      modalVisible: false,
      carno:{value:null,label:null},
      CARNO:[]
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
    // console.log(this.props.navigation.getParam("car_id"));
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
          if(data.status == 0 || data.id == self.state.carno.value){
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
        console.log("Create Maintenance Car List",err);
      })
  }

  //create car report
  _handleOnSave = async () => {
    let isError = false;
    if (this.state.carno.value == null) {
      // alert("Helo");
      this.setState({ ISERRORCAR: true });
      isError = true;
    }
    if (this.state.Kilo == null) {
      // alert("Helo");
      this.setState({ ISERRORKILO: true });
      isError = true;
    }
    if (this.state.price == null) {
      // alert("Helo");
      this.setState({ ISERRORPRICE: true });
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
      formData.append("kilo", self.state.Kilo);
      formData.append("price", self.state.price);
      if (imagePath) {
        const uriPart = imagePath.split(".");
        const fileExtension = uriPart[uriPart.length - 1];
        const fileName = imagePath.substr(imagePath.lastIndexOf("/") + 1);

        formData.append("photo", {
          uri: imagePath,
          name: fileName,
          type: `image/${fileExtension}`,
        });
      }
      // console.log(formData);
      axios
        .post(CreateRefuelApi, formData, {
          headers,
        })
        .then(function (response) {
          self.setState({ isOpenSuccessModel: true, modalVisible: false });
        })
        .catch(function (err) {
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
    this.props.navigation.navigate("RefuelList");
  }

  _handleSelect(value, label) {
    this.setState({
      carno: { value: value, label: label },
      ISERRORCAR:false
    })
  }
  
  render() {
    // console.log(this.props.navigation.getParam("car_id"));
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          // behavior="padding"
          behavior={Platform.OS == "ios" ? "padding" : null}
          enabled
          // keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Car No</Text>
              </View>
              <View style={styles.textInputContainer}>
              <DropDown
              value={this.state.carno}
              widthContainer="100%"
              options={this.state.CARNO}
              onSelect={(value, label) => this._handleSelect(value,label)}
            />
              <ErrorText
                  errMessage="please select carno"
                  isShow={this.state.ISERRORCAR}
                />
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Driver Name</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.dirvername}
                  // keyboardType="number-pad"
                  style={styles.textInputStyle}
                  editable={false}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Kilo</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.Kilo}
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  onChangeText={(value) =>
                    this.setState({ Kilo: value, ISERRORKILO: false })
                  }
                ></TextInput>
                <ErrorText
                  errMessage="please enter kilo"
                  isShow={this.state.ISERRORKILO}
                />
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Price</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.price}
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  onChangeText={(value) =>
                    this.setState({ price: value, ISERRORPRICE: false })
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
                <Text style={styles.labelStyle}>Voucher</Text>
              </View>

              <View style={{ flex: 1 }}>
                <ImgUploadBtn
                  imagePath={this.state.imagePath}
                  onChooseImage={this._handleOnChooseImage.bind(this)}
                />
                <ErrorText
                  errMessage="please enter start place"
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
        </KeyboardAvoidingView>
        <LoadingModal isOpenModal={this.state.modalVisible} />

        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully refuel created"
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
    marginTop: 10,
  },
});
