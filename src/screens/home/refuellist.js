import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import DatePicker from "react-native-datepicker";
import Moment from "moment";

//import styles
import Style from "@styles/Styles";

//import components
import RefuelCard from "@components/refuelCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import { GetRefuelApi } from "@api/Url";

export default class RefuelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      dirverid: null,
      data: [],
      refreshing: false,
      isFooterLoading: false,
      isLoading: true,
      arrIndex: null,
      photo: null,
      imagePath: null,
      car_id: null,
      carno: null,
      start_time: "",
      end_time: "",
      count: null
    };
    this.page = 1;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const userid = await AsyncStorage.getItem("userid");
    this.setState({
      access_token: access_token,
      dirverid: userid,
      car_id: this.props.navigation.getParam("car_id"),
      carno: this.props.navigation.getParam("carno"),
    });

    const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", async () => {
    //   await this._getRefuelList(this.page);
    // });
    await this._getRefuelList(this.page);
  }

  //call api
  _getRefuelList = async (page) => {
    if (this.state.isSearched == true) {
      this.setState({
        data: [],
        isSearched: false,
      });
    }
    var self = this;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dates = date + "-" + month + "-" + year;
    const url =
      GetRefuelApi +
      page +
      "&start_date=" +
      dates +
      "&end_date=" +
      dates +
      "&driverId=" +
      self.state.dirverid;
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
          // data:response.data.data.data,
          data: [...self.state.data, ...response.data.data.data],
          count: response.data.count,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          imagePath: response.data.data.path,
          count: response.data.data.total
          // tempData: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");

        console.log("Refuel List Error", err);
      });
  };

  _handelStartDate(date) {
    // alert(date);
    this.setState({ start_time: date });
    this._handleDate(this.page, date, this.state.end_time);
  }
  _handleEndDate(date) {
    this.setState({ end_time: date });
    this._handleDate(this.page, this.state.start_time, date);
  }

  //call api
  _handleDate = async (page, sdate, edate) => {
    // alert("Hello")
    // alert(edate);
    this.state.data = [];
    var self = this;
    self.setState({ isSearched: false, count: null });
    // console.log("Sart time",sdate);
    const url =
      GetRefuelApi +
      page +
      "&start_date=" +
      sdate +
      "&end_date=" +
      edate +
      "&driverId=" +
      self.state.dirverid;
    // console.log("Handle Search", url);

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          // data:response.data.data.data,
          data: [...self.state.data, ...response.data.data.data],
          count: response.data.count,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          imagePath: response.data.data.path,
          count: response.data.data.total
          // tempData: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        console.log("History Error", err);
      });
  };

  // retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1;
    this._getRefuelList(this.page); // method for API call
  };

  //renderfooter
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  //RefreshControl

  onRefresh = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dates = date + "-" + month + "-" + year;
    this.setState({
      data: [],
      refreshing: true,
      start_time: dates,
      end_time: dates
    });
    this._getRefuelList(this.page);
  };

  render() {
    // console.log("Refuel List",this.props.navigation.getParam("car_id"));
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched, data, count } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;

    return (
      <View style={styles.container}>
        {/* <ScrollView>
          {this.state.data.map((item, index) => {
            // console.log("ToleGateLsit",item)
            return (
              <View key={index}>
                <RefuelCard
                carno={item.car_no}
                date={item.created_at}
                kilo={item.kilo}
                price={item.price}
                imagePath={this.state.imagePath}
                photo={item.photo}
                OnPress={() => this.props.navigation.navigate("EditRefuel",{data:item})}
              />
              </View>
            );
          })}
          </ScrollView> */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ flex: 1 }}>Start Date</Text>
          <Text style={{ flex: 1, paddingLeft: 15 }}>End Date</Text>
        </View>
        <View style={styles.secondContainer}>
          <DatePicker
            date={this.state.start_time}
            mode="date"
            format="DD-MM-YYYY"
            // maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this._handelStartDate(date)}
          />
          <DatePicker
            date={this.state.end_time}
            mode="date"
            format="DD-MM-YYYY"
            maxDate={Moment().endOf("day").toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("@images/calendar.png")}
            style={Style.datePickerContainer}
            customStyles={{
              dateIcon: Style.datePickerDateIcon,
              dateInput: Style.datePickerDateInput,
              dateText: Style.datePickerDateText,
            }}
            onDateChange={(date) => this._handleEndDate(date)}
          />
        </View>

        <Text
          style={{
            color: "#0470DD",
            margin: 10,
            textAlign: "right",
            fontSize: 16,
          }}
        >
          Total = {count}
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            // console.log(item),
            <RefuelCard
              carno={item.car_no}
              date={item.created_at}
              kilo={item.kilo}
              price={item.price}
              imagePath={this.state.imagePath}
              photo={item.photo}
              OnPress={() =>
                this.props.navigation.navigate("EditRefuel", { data: item })
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        // onEndReached={() => this.handleLoadMore()}
        />

        <View
          style={{
            position: "absolute",
            right: 20,
            bottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CreateRefuel", {
                car_id: this.state.car_id,
                carno: this.state.carno,
              })
            }
          >
            <Image source={require("@images/addblue.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
});
