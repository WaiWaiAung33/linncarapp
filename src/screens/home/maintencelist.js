import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import DatePicker from "react-native-datepicker";
import Moment from "moment";

//import styles
import Style from "@styles/Styles";

//import components
import MaintenceListCard from "@components/maintenceListCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import { MaintenceListApi } from "@api/Url";

export default class RefuelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      access_token: null,
      refreshing: false,
      isFooterLoading: false,
      isLoading: true,
      arrIndex: null,
      dirverid: null,
      car_id: null,
      carno: null,
      start_time: "",
      end_time: "",
      isSearched: false,
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
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getMaintence(this.page);
    });
  }

  //call api
  _getMaintence = async (page) => {
    var self = this;
    const url =
      MaintenceListApi +
      page +
      "&start_date=" +
      self.state.start_time +
      "&end_date=" +
      self.state.end_time +
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
        // console.log("Maintence List Api",response.data);
        self.setState({
          data: [...self.state.data, ...response.data.data.data],
          // data: response.data.data.data,
          count: response.data.count,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
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
        console.log("Maintence Error", err);
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
    self.setState({ isSearched: false });
    // console.log("Sart time",sdate);
    const url =
      MaintenceListApi +
      page +
      "&start_date=" +
      sdate +
      "&end_date=" +
      edate +
      "&driverId=" +
      self.state.dirverid;
    // console.log(url);
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
          data: [...self.state.data, ...response.data.data.data],
          // data: response.data.data.data,
          count: response.data.count,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
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
    this._getMaintence(this.page); // method for API call
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
    this.setState({
      data: [],
      refreshing: true,
    });
    this._getMaintence(this.page);
  };

  render() {
    // console.log(this.state.isLoading);
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched, data } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;
    return (
      <View style={styles.container}>
        {/* <ScrollView>
          {this.state.data.map((item, index) => {
            // console.log("ToleGateLsit",item)
            return (
              <View key={index}>
                <MaintenceListCard
                  carno={item.car_no}
                  name={item.dname}
                  price={item.amount}
                  reason={item.reason}
                  date={item.created_at}
                  OnPress={() =>
                    this.props.navigation.navigate("EditMaintence",{datas:item})
                  }
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
            <View style={{ marginTop: 5 }}>
              <MaintenceListCard
                carno={item.car_no}
                name={item.dname}
                price={item.amount}
                reason={item.reason}
                date={item.created_at}
                OnPress={() =>
                  this.props.navigation.navigate("EditMaintence", {
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
          // onEndReached={() => this.handleLoadMore()}
        />

        <View
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CreateMaintence", {
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
