import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

//import components
import DriverListCard from "@components/dirverlistCard";
import Loading from "@components/Loading";

//import api
const axios = require("axios");
import { driverlistapi } from "@api/Url";

export default class DriverList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      access_token: null,
      refreshing: false,
      isFooterLoading: false,
      isSearched: false,
      isLoading:true,
      count: null,
      search: "",
      arrIndex: null,
    };
    this.page = 1;
  }

  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      access_token: access_token,
    });

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getDriverList(this.page);
    });
   
  }

  //call api
  _getDriverList = async (page) => {
    var self = this;
    if (this.state.isSearched == true) {
      this.setState({
        data: [],
        isSearched: false,
      });
    }
    var self = this;
    const url = driverlistapi + page+"&keyword=" + self.state.search ;
    // console.log(url);

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Driver List Api",response.data);
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
        console.log("Driver List Error", err);
      });
  };

   //call api
   _handleOnSearch = async (page) => {
    
    var self = this;
    self.state.data = [];
    self.state.count = null;
    self.setState({ isSearched: false });
    const url = driverlistapi + page+"&keyword=" + self.state.search ;
    // console.log(self.state.search);

    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Driver List Api",response.data);
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
        console.log("Driver List Error", err);
      });
  };


  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1;
    this._getDriverList(this.page); // method for API call
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
    this._getDriverList(this.page);
  };

  render() {
    // console.log(this.props.navigation.getParam("status"));
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { isSearched,data,count } = this.state;
    // var dataList = isSearched ? data : data;
    var dataList = data;
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextInput}>
            <TextInput
            value={this.state.search}
              style={styles.textSearch}
              placeholder="Search ..."
              onChangeText={(value)=>this.setState({search:value})}
            ></TextInput>
          </View>
          <TouchableOpacity
           style={styles.searchBtn}
           onPress={() => this._handleOnSearch(this.page)}
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
              <DriverListCard
                name={item.dname}
                phone={item.phone}
                OnPress={() =>
                  this.props.navigation.navigate("dirverlistdetail", {
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
          onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
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
