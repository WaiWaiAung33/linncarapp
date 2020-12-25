import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

import DatePicker from "react-native-datepicker";
import Moment from "moment";

//import styles
import Style from "@styles/Styles";

//import components
import HistoryCard from "@components/historyCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import { gethistoryapi } from "@api/Url";

export default class History extends React.Component {
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
      start_time: "",
      end_time: "",
      isSearched: false,
      count: ""
    };
    this.page = 1;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    const userid = await AsyncStorage.getItem("userid");
    this.setState({
      access_token: access_token,
      dirverid: userid,
    });
    // console.log("Start Date",this.state.start_date);

    const { navigation } = this.props;
    await this._gethistory(this.page);
    // this.focusListener = navigation.addListener("didFocus", async () => {

    // });
  }

  //call api
  _gethistory = async (page) => {

    var self = this;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dates = date + "-" + month + "-" + year;
    // console.log("Sart time",self.state.start_date);
    const url =
      gethistoryapi +
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
        // console.log("History List",response.data);
        self.setState({
          data: [...self.state.data, ...response.data.data.data],
          // data: response.data.data.data,
          count: response.data.data.total,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          imagePath: response.data.data.path,
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

  _handelStartDate(date) {
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
    // alert(sdate);
    this.state.data = [];
    this.count = "";
    var self = this;
    self.setState({ isSearched: false });
    // console.log("Sart time",sdate);
    const url =
      gethistoryapi +
      page +
      "&start_date=" +
      sdate +
      "&end_date=" +
      edate +
      "&driverId=" +
      self.state.dirverid;
    // console.log("Handle Search",url);

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        console.log(response.data);
        self.setState({
          data: [...self.state.data, ...response.data.data.data],
          // data: response.data.data.data,
          count: response.data.data.total,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          imagePath: response.data.data.path,
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

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1;
    this._gethistory(this.page); // method for API call
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

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          // backgroundColor: "#607D8B",
        }}
      />
    );
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
    this._gethistory(this.page);
  };

  render() {
    // console.log(this.state.start_time);
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched, data, count } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;
    return (
      <View style={styles.container}>
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
          // extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            // console.log(item),
            <View>
              <HistoryCard
                carno={item.car_no}
                date={item.created_at}
                photo={item.photo}
                OnPress={() =>
                  this.props.navigation.navigate("HistoryDetail", {
                    datas: item,
                  })
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        // onEndReached={() =>(isSearched == false ? this.handleLoadMore() : {})}
        />
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
