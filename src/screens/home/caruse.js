import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";

//import api
const axios = require("axios");
import { CarUseApi } from "@api/Url";

export default class CarUse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      name: null,
      phone: null,
      status: null,
      reason: null,
      load: true,
    };
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
    });
    this._getCarUse();
  }

  _getCarUse = async (page) => {
    var self = this;
    const url = CarUseApi + self.props.navigation.getParam("datas").id;
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Car Using Api",response.data);
        self.setState({
          name: response.data.dname,
          phone: response.data.phone,
          status: response.data.status,
          reason: response.data.reason,
        });
      })
      .catch(function (err) {
        console.log("Car Using Error", err);
      });
  };

  render() {
    // console.log(this.props.navigation.getParam("datas").id);
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.circle}>
            <Image source={require("@images/car.png")} />
          </View>
        </View>

        <View style={{ flexDirection: "row", margin: 10 }}>
          <View>
            <Text style={styles.text}>Dirver Name</Text>
            <Text style={styles.text}>Phone No</Text>
            <Text style={styles.text}>Status</Text>
            <Text style={styles.text}>Reason</Text>
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.text}>
              {this.state.name ? this.state.name : "-"}
            </Text>
            <Text style={styles.text}>
              {this.state.phone ? this.state.phone : "-"}
            </Text>
            <Text style={styles.text}>
              {this.state.status == 1 ? "Using" : "-"}
            </Text>
            <Text style={styles.text}>
              {this.state.reason ? this.state.reason : "-"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "white",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
  },
});
