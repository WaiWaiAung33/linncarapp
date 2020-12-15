import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,  AsyncStorage,
  FlatList,
  ActivityIndicator,
  RefreshControl, } from "react-native";

//import components
import MaintenceListCard from "@components/maintenceListCard";

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
      isLoading: false,
      arrIndex: null,
      dirverid: null,
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

    await this._getMaintence();
  }

  //call api
  _getMaintence = async () => {
    var self = this;
    const url = MaintenceListApi+  self.state.dirverid;
    console.log(url);

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

    //retrieve More data
    handleLoadMore = () => {
      this.setState({ isFooterLoading: true }); // Start Footer loading
      // this.page = this.page + 1;
      this._getMaintence(); // method for API call
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
      this._getMaintence();
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
                OnPress={() => this.props.navigation.navigate("EditMaintence")}
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
       
        <View
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreateMaintence")}
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
});
