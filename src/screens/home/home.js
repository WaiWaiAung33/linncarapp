import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";

//import api
const axios = require("axios");
import { TimeoutApi } from "@api/Url";

//import components
import Loading from "@components/Loading";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phoneno: null,
      access_token: null,
      driverid: null,
      status: null,
      carno: null,
      refreshing: true,
      car_id: null,
      report_id: null,
    };
  }
  async componentDidMount() {
    const name = await AsyncStorage.getItem("name");
    const access_token = await AsyncStorage.getItem("access_token");
    const userid = await AsyncStorage.getItem("userid");
    // console.log(name);
    const phoneno = await AsyncStorage.getItem("loginID");
    this.setState({
      name: name,
      phoneno: phoneno,
      access_token: access_token,
      driverid: userid,
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getTimeOut();
    });
    
  }

  //call api

  _getTimeOut() {
    var self = this;
    const url = TimeoutApi + self.state.driverid;
    // console.log(url);
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        console.log("Time Out Api", response.data);
        self.setState({
          carno: response.data.car_no,
          status: response.data.staus,
          refreshing: false,
          car_id: response.data.car_id,
          report_id: response.data.report_id,
        });
      })
      .catch(function (err) {
        // console.log("Time Out Error", err);
      });
  }

  async _handelLogout() {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }
  render() {
    console.log(this.state.car_id);
    // if (this.state.refreshing) {
    //   return <Loading />;
    // }
    // console.log(this.state.car_id);
    return this.state.loading ? (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      </View>
    ) :(

      <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.secondContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("@images/logo.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
        </View>
        {this.state.status == 1 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text style={{ color: "white" }}>
              Your are using Car No : {this.state.carno}
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#DCE6EC",
                backgroundColor: "#DCE6EC",
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() =>
                this.props.navigation.navigate("Timeout", {
                  report_id: this.state.report_id,
                  car_id: this.state.car_id,
                  carno: this.state.carno,
                })
              }
            >
              <Text>Time Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
          >
            <View>
              <Text style={styles.headerText}>Name</Text>
              <Text style={[styles.headerText, { paddingTop: 10 }]}>
                Phone No
              </Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.headerText}>{this.state.name}</Text>
              <Text style={[styles.headerText, { paddingTop: 10 }]}>
                {this.state.phoneno}
              </Text>
            </View>
          </View>
        )}
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
            marginLeft: 10,
            marginTop: 8,
          }}
        >
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("CarList", {
                  status: this.state.status,car_id:this.state.car_id,carno:this.state.carno
                })
              }
            >
              <View style={styles.secondCard}>
                <Image source={require("@images/car.png")} />
              </View>
              <Text style={styles.text}>Car List</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("RefuelList",{car_id:this.state.car_id,carno:this.state.carno})}
            >
              <View style={styles.secondCard}>
                <Image source={require("@images/shop.png")} />
              </View>
              <Text style={styles.text}>To Refuel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
            marginLeft: 10,
            marginTop: 8,
          }}
        >
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MaintenceList",{car_id:this.state.car_id,carno:this.state.carno})}
            >
              <View style={styles.secondCard}>
                <Image source={require("@images/maintenance.png")} />
              </View>
              <Text style={styles.text}>Maintenance</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("History")}
            >
              <View style={styles.secondCard}>
                <Image source={require("@images/history.png")} />
              </View>
              <Text style={styles.text}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
            marginLeft: 10,
            marginTop: 8,
          }}
        >
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DriverList")}
            >
              <View style={styles.secondCard}>
                <Image source={require("@images/maintenance.png")} />
              </View>
              <Text style={styles.text}>Driver List</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => this._handelLogout()}>
              <View style={styles.secondCard}>
                <Image source={require("@images/logout.png")} />
              </View>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#3D73D5", fontWeight: "bold" }}>
          Version : 1.1.0
        </Text>
      </View>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE6EC",
  },
  secondContainer: {
    height: 180,
    backgroundColor: "#3D73D5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  card: {
    width: "48%",
    height: 130,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#3D73D5",
    // shadowOffset:{width:1,height:1},
    // shadowOpacity:0.5,
  },
  secondCard: {
    width: 80,
    height: 80,
    backgroundColor: "#DCE6EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#DCE6EC",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: "center",
  },
  headerText: {
    color: "white",
    fontSize: 15,
  },
});
