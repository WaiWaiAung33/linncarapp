import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

//import component
import CarListCard from "@components/carlistCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import { CarlistApi } from "@api/Url";

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      access_token: null,
      refreshing: false,
      isFooterLoading: false,
      isSearched: false,
      isLoading: false,
      count: null,
      search: null,
      arrIndex: null,
    };
    this.page = 1;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
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
        // console.log("Car List Api",response.data.data.data);
        self.setState({
          data: [...self.state.data, ...response.data.data.data],
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
        // console.log("Customer Error", err);
      });
  };

  //handelSearch

  _handleOnSearch = async (page, search) => {
    var self = this;
    const url = CarlistApi + page;
    let bodyParam = {
      keyword: search,
    };
    // console.log(self.state.access_token);
    axios
      .get(url, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      // console.log(headers)
      .then(function (response) {
        // console.log(response.data);
        // self.setState({
        //   data: [...self.state.data, ...response.data.history.data],
        //   // searchTravel: response.data.history.data,
        // });
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("Customer Error", err);
      });
  };

  //handel Detail
  _handleDetail(arrIndex, item) {
    // alert(item.status);
    // console.log(item);
    if (arrIndex == 1) {
      this.props.navigation.navigate("CarDetail", { datas: item });
    }
  }

  //handle Car State
  //handel Detail
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

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1;
    this._getCarlist(this.page); // method for API call
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
      // data: [],
      refreshing: true,
    });
    this._getCarlist(this.page);
  };

  render() {
    // console.log(this.props.navigation.getParam("status"));
    if (this.state.isLoading) {
      return <Loading />;
    }

    var { data } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextInput}>
            <TextInput
              value={this.state.search}
              style={styles.textSearch}
              placeholder="Search ..."
              onChangeText={(value) => this.setState({ search: value })}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => this._handleOnSearch(this.page, this.state.search)}
            style={styles.searchBtn}
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
          Total = {this.state.count}
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
            <View style={{ marginTop: 5 }}>
              <CarListCard
                carno={item.car_no}
                kilo={item.end_kilo}
                status={item.status}
                onPress={() => this._handleDetail(1, item)}
                // onPress={() => this.props.navigation.navigate("CarDetail",{data:item})}
                onPressUse={() => this._handleCarState(1, item)}
                arrIndex={1}
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
          onEndReached={() => this.handleLoadMore()}
        />
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
