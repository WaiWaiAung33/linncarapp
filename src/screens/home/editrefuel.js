import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

//import components
import DropDown from "@components/DropDown";
import ImgUploadBtn from "@components/ImgUploadBtn";
import SuccessModal from "@components/SuccessModal";
import LoadingModal from "@components/LoadingModal";

//import api
const axios = require("axios");
import { CarlistApi, ImguploadApi, EditRefuelApi } from "@api/Url";
import FormData from "form-data";

export default class EditRefuel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carno: { value: null, label: null },
      Carno: [],
      access_token: null,
      dirvername: null,
      Kilo: null,
      price: null,
      imagePath: null,
      dirverid: null,
      isOpenSuccessModel: false,
      modalVisible: false,
    };
    this.page = 0;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const dirvername = await AsyncStorage.getItem("name");
    const dirver = await AsyncStorage.getItem("userid");
    // console.log(this.props.navigation.getParam("data"));

    this.setState({
      access_token: access_token,
      dirvername: dirvername,
      dirverid: dirver,
      dirvername: this.props.navigation.getParam("data").dname,
      Kilo: this.props.navigation.getParam("data").kilo,
      price: this.props.navigation.getParam("data").price,
      carno: {
        value: this.props.navigation.getParam("data").car_id,
        label: this.props.navigation.getParam("data").car_no,
      },
      imagePath: ImguploadApi + this.props.navigation.getParam("data").photo,
    });

    await this._getCarlist(this.page);
  }

  //call api
  _getCarlist = async (page) => {
    var self = this;
    const url = CarlistApi + page;
    // console.log(self.state.search);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        let carno = response.data.car_list;
        let arr = [];
        carno.map((data, index) => {
          var obj = { value: data.id.toString(), label: data.car_no };
          arr.push(obj);
        });
        self.setState({
          Carno: arr,
        });
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  //edit api

  //create car report
  _handelBtn = async () => {
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
    const url = EditRefuelApi + self.props.navigation.getParam("data").id;
    // console.log(formData);
    axios
      .post(url, formData, {
        headers,
      })
      .then(function (response) {
        self.setState({ isOpenSuccessModel: true, modalVisible: false });
      })
      .catch(function (err) {
        alert("Server Error");
        self.setState({ isOpenSuccessModel: false, modalVisible: false });
      });
  };

  //handle usertype
  _handleOnSelectCarno(value, label) {
    this.setState({
      carno: { value: value, label: label },
    });
  }

  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri });
  }
  //on close
  _handleOnClose() {
    this.setState({
      isOpenSuccessModel: false,
    });
    this.props.navigation.navigate("RefuelList");
  }

  render() {
    // console.log(this.state.carno.value);
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
              options={this.state.Carno}
              onSelect={(value, label) =>
                this._handleOnSelectCarno(value, label)
              }
              placeholder="Select car_no..."
            ></DropDown>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.labelStyle}>Driver Name</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.dirvername}
              editable={false}
              // keyboardType="number-pad"
              style={styles.textInputStyle}
            // onChangeText={()=>this.setState({dirvername:value})}
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
              onChangeText={(value) => this.setState({ Kilo: value })}
            ></TextInput>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.labelStyle}>Price</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.price}
              // keyboardType="number-pad"
              style={styles.textInputStyle}
              onChangeText={(value) => this.setState({ price: value })}
            ></TextInput>
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
              onPress={() => this._handelBtn()}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoadingModal isOpenModal={this.state.modalVisible} />
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully refuel updated"
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
