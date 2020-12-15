import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image,Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//import Components
import CustomModalPhoto from "@components/CustomModalPhoto";
const {width,height} = Dimensions.get("window");

export default class ImgUploadBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPhotoModal: false,
      isOpenImage: false,
      show: false,
    };
  }

  getPermissions = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);

    const { status } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status !== "granted") {
      // alert("Permission Not Granted");
      this.setState({ isOpenSuccessModal: true });
    } else {
      this.setState({ isOpenPhotoModal: true });
    }
  };

  onPressUploadBtn() {
    this.getPermissions();
    this.setState({ show: !this.state.show });
  }

  _handleOnCloseSuccessModal() {
    this.setState({ isOpenSuccessModal: false });
  }

  pickPhoto = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      maxWidth: width,
      maxHeight: height,
    });
    this.setState({ isOpenPhotoModal: false });
    if (pickerResult.cancelled == false) {
      //callPropsFunction
      if (this.props.onChooseImage) {
        this.props.onChooseImage(pickerResult);
      }
    }
  };

  takePhoto = async () => {
    let imagResult = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      maxWidth: width,
      maxHeight: height,
    });
    this.setState({ isOpenPhotoModal: false });
    if (imagResult.cancelled == false) {
      //callPropsFunction
      if (this.props.onChooseImage) {
        this.props.onChooseImage(imagResult);
      }
    }
  };


  _handleOnChoose(action) {
    if (action == "PICK_PHOTO") {
      this.pickPhoto();
    }
    if (action == "TAKE_PHOTO") {
      this.takePhoto();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.imagePath ? (
          <TouchableOpacity
            // onPress={() => this.setState({ isOpenImage: true })}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressUploadBtn();
            }}
          >
            <Image
              style={styles.selectedImage}
              source={{ uri: this.props.imagePath }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => {
              this.onPressUploadBtn();
            }}
          >
            <View>
              <Image
                style={styles.btnIcon}
                source={require("@images/camera.png")}
              />
            </View>
          </TouchableOpacity>
        )}

        {/* {this.props.imagePath ? (
          <TouchableOpacity
            onPress={() => this.setState({ isOpenImage: true })}
            activeOpacity={0.7}
          >
            <Image
              style={styles.selectedImage}
              source={{ uri: this.props.imagePath }}
            />
          </TouchableOpacity>
        ) : null} */}

        <CustomModalPhoto
          isOpen={this.state.isOpenPhotoModal}
          onClose={() => this.setState({ isOpenPhotoModal: false })}
          onChoose={this._handleOnChoose.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 40
  },
  btn: {
    // flexDirection: "row",
    borderWidth: 1,
    // width:"50%",
    height: 100,
    // paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 5,
    borderStyle: "solid",
    justifyContent: "center",
    borderColor: "#E3EEF5",
    backgroundColor: "#E3EEF5",
    elevation: 3,
    width:230,
    marginLeft:15,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    // flex: 1,
    marginTop: 5,
  },
  btnIcon: {
    width: 30,
    height: 30,
  },
  btnText: {
    fontSize: 14,
    // fontFamily: Fonts.secondary,
    marginLeft: 10,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});
