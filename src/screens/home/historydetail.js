import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Image
} from "react-native";

//import components
import ImgUploadBtn from "@components/ImgUploadBtn";

//import api
const axios = require("axios");
import { gethistorydetailapi,ImgHistoryuploadApi } from "@api/Url";

export default class HistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      dirverid: null,
      name:null,
      carno:null,
      usagename:null,
      startplace:null,
      endplace:null,
      reason:null,
      startkilo:null,
      endkilo:null,
      startkilophoto:null,
      endkilophoto:null

    };
    // this.page = 1;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const userid = await AsyncStorage.getItem("userid");
    this.setState({
      access_token: access_token,
      dirverid: userid,
    });

    await this._gethistorydeetail();
  }

  //call api
  _gethistorydeetail = async () => {
    var self = this;
    const url = gethistorydetailapi + self.props.navigation.getParam("datas").id;
    // console.log(url);

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({
            name:response.data.dname,
            carno:response.data.car_no,
            usagename:response.data.usageName,
            startplace:response.data.start_place,
            endplace:response.data.end_place,
            startkilo:response.data.start_kilo,
            endkilo:response.data.end_kilo,
            reason:response.data.reason,
            startkilophoto:response.data.startKilo_photo,
            endkilophoto:response.data.endKilo_photo

        })
      })
      .catch(function (err) {
        // console.log("History Error", err);
      });
  };

  render() {
    // console.log(ImgHistoryuploadApi + this.state.endkilophoto);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Name</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
              value={this.state.name}
              editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Car No</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
              value={this.state.carno}
              editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Usage Name</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
               value={this.state.usagename}
               editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
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
               editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>End Place</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
               value={this.state.endplace}
               editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Reson</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
               value={this.state.reason}
               editable={false}
                // keyboardType="number-pad"
                style={styles.textAreaStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Kilo</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
               value={this.state.startkilo}
               editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>End Kilo</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
               value={this.state.endkilo}
               editable={false}
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Driving Kilo</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                // keyboardType="number-pad"
                style={styles.textInputStyle}
              ></TextInput>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>Start Kilo Photo</Text>
            </View>
            <Image
                source={{
                  uri: ImgHistoryuploadApi + this.state.startkilophoto,
                }}
                style={{ width: 100, height: 100 }}
              />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.labelStyle}>End Kilo Photo</Text>
            </View>
            <Image
                source={{
                  uri: ImgHistoryuploadApi + this.state.endkilophoto,
                }}
                style={{ width: 100, height: 100 }}
              />
          </View>
        </ScrollView>
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
