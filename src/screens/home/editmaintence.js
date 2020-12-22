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
import {
  editmaintenceapi,
  ImgMaintenanceuploadApi,
} from "@api/Url";
import FormData from "form-data";

export default class EditMaintence extends React.Component {
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
      id: null,
      modalVisible: false,
      carstate: null,
      car_id:null,
      carno:null
    };
   
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const dirvername = await AsyncStorage.getItem("name");
    const dirver = await AsyncStorage.getItem("userid");
    const data = this.props.navigation.getParam("datas");
    console.log(data);
    this.setState({
      access_token: access_token,
      dirvername: dirvername,
      dirverid: dirver,
      id: data.id,
      carno: data.car_no,
      car_id:data.car_id,
      dirvername: data.dname,
      amount: data.amount,
      reason: data.reason,
      imagePath: ImgMaintenanceuploadApi + data.vPhoto,
    });

  }

  //create car report
  _handleOnSave = async () => {
    const self = this;
    self.setState({ modalVisible: true });
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + self.state.access_token,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    const { imagePath } = self.state;
    formData.append("car_no", self.state.car_id);
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
    const url = editmaintenceapi + "/" + self.state.id;
    // console.log(url);
    axios
      .post(url, formData, {
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
  };

 
  //handle usertype
  _handleOnSelectCarno(value, label) {
    this.setState({
      carno: { value: value, label: label },
    });
  }

  //image
  _handleOnChooseImage(image) {
    this.setState({ imagePath: image.uri });
  }

  //on close
  _handleOnClose() {
    this.setState({
      isOpenSuccessModel: false,
    });
    this.props.navigation.navigate("MaintenceList");
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
          <TextInput
              value={this.state.carno}
              // keyboardType="number-pad"
              style={styles.textInputStyle}
              editable={false}
              // onChangeText={(value)=>this.setState({dirvername:value})}
            ></TextInput>
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
              // onChangeText={(value)=>this.setState({dirvername:value})}
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
              onChangeText={(value) => this.setState({ amount: value })}
            ></TextInput>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.labelStyle}>Reson*</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.reason}
              // keyboardType="number-pad"
              style={styles.textAreaStyle}
              onChangeText={(value) => this.setState({ reason: value })}
            ></TextInput>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.labelStyle}>Voucher Photo</Text>
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
              onPress={() => this._handleOnSave()}
            >
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoadingModal isOpenModal={this.state.modalVisible} />
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully maintenance updated"
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
    marginTop: 10,
  },
  btnText: {
    color: "#ffffff",
  },
});
