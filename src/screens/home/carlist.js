import React from "react";
import {
  View,
  AsyncStorage,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

//import components
import CarListCard from "@components/carlistCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import CarListApi from "@api/CarListUrl";

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      data: [],
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
      carlist: [],
      tempdata: [],
      searchCarlist: [],
      isSearched: false,
      carno: "",
      keyword: "",
      arrIndex: null,
      count: 0
    };
    // this.page = 1;
    this.CarListApi = new CarListApi();
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    this.setState({ isLoading: true }); // Start page loading
    this.getAllCarList();
  }

  getAllCarList() {
    var self = this;

    //if isSearch previous state is true , need to set to false and clear business data
    if (self.state.isSearched) {
      self.setState({
        carlist: [],
        isSearched: false,
        carno: "",
      });
    }
    this.CarListApi.getAllCarList()
      .then(function (response) {
        // console.log(response.data.car_list);
        self.setState({
          // tempBusiness: response.data.data.data,
          // carlist:response.data.car_list,
          carlist: [...self.state.carlist, ...response.data.car_list],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          count: response.data.count
        });
      })
      .catch(function (error) {
        // console.log("Car List", error);
        alert("Server Error");
        self.setState({
          isLoading: false,
          refreshing: false,
          isFooterLoading: false,
        });
      });
  }

  _handleOnSearch() {
    const self = this; // *
    self.state.carlist = [];
    self.state.count = 0
    // alert(self.state.keyword);
    // console.log(this.CarListApi.getCarListbyID);
    self.setState({ isSearched: true });
    const { keyword } = this.state;
    this.CarListApi.getCarListbyID(keyword)
      .then(function (response) {
        // console.log(response.data);
        self.setState({
          // searchCarlist: response.data.car_list,
          carlist: [...self.state.carlist, ...response.data.car_list],
          count: response.data.count
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  _handleCarState(arrIndex, item) {
    // alert(item.status);
    // console.log(item);
    if (arrIndex == 1 && item.status == 1) {
      this.props.navigation.navigate("CarUse", { datas: item });
    } else if (arrIndex == 1 && item.status == 0) {
      this.props.navigation.getParam("status") == 1
        ? this.props.navigation.navigate("#")
        : this.props.navigation.navigate("CreteCar", { data: item });
    }
  }

  _handleDetail(arrIndex, item) {
    // alert(item.status);
    // console.log(item);
    if (arrIndex == 1) {
      this.props.navigation.navigate("CarDetail", { datas: item });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, carlist, searchCarlist, count } = this.state;
    const dataList = isSearched ? searchCarlist : carlist;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextInput}>
            <TextInput
              value={this.state.keyword}
              style={styles.textSearch}
              placeholder="Search ..."
              onChangeText={(value) => this.setState({ keyword: value })}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => this._handleOnSearch()}
          >
            <Image
              source={require("@images/search.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
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
        <ScrollView>
          {this.state.carlist.map((item, index) => {
            return (
              <View style={{ marginTop: 10 }} key={index}>
                <CarListCard
                  carno={item.car_no}
                  kilo={item.end_kilo}
                  status={item.status}
                  photo={item.photo}
                  onPress={() => this._handleDetail(1, item)}
                  onPressUse={() => this._handleCarState(1, item)}
                  arrIndex={1}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  searchTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0470DD",
    height: 40,
    // marginRight: 10,
    borderRadius: 5,
    // paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtn: {
    backgroundColor: "#0470DD",
    width: "15%",
    height: 40,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textSearch: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
});
