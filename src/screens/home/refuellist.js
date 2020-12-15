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
  ScrollView
} from "react-native";

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
      isLoading: false,
      arrIndex: null,
      photo:null,
      imagePath:null
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

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this._getRefuelList();
    });

    
  }

  //call api
  _getRefuelList = async () => {
    var self = this;
    const url = GetRefuelApi + self.state.dirverid;
    // console.log(self.state.search);

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
          data:response.data.data.data,
          // data: [...self.state.data, ...response.data.data.data],
          count: response.data.count,
          // refreshing: false,
          // isLoading: false,
          // isFooterLoading: false,
          imagePath:response.data.data.path,
          // tempData: response.data.history.data,
        });
      })
      .catch(function (err) {
        // alert("Error");
      
        console.log("Refuel List Error", err);
      });
  };

  //retrieve More data
  // handleLoadMore = () => {
  //   this.setState({ isFooterLoading: true }); // Start Footer loading
  //   // this.page = this.page + 1;
  //   // this._getRefuelList(); // method for API call
  // };

  //renderfooter
  // renderFooter = () => {
  //   //it will show indicator at the bottom of the list when data is loading
  //   if (this.state.isFooterLoading) {
  //     return <ActivityIndicator size="large" style={{ color: "#000" }} />;
  //   } else {
  //     return null;
  //   }
  // };

  //RefreshControl

  // onRefresh = () => {
  //   this.setState({
  //     // data: [],
  //     refreshing: true,
  //   });
  //   // this._getRefuelList();
  // };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    var { data } = this.state;
    // var dataList = isSearched ? searchTravel : data;
    var dataList = data;

    return (
      <View style={styles.container}>
        <ScrollView>
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
          </ScrollView>

        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          // extraData={this.state}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this.onRefresh.bind(this)}
          //   />
          // }
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
              OnPress={() => this.props.navigation.navigate("EditRefuel",{data:item})}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this.renderFilter.bind(this)}
          // ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          // onEndReached={() => this.handleLoadMore()}
        /> */}

        <View
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreateRefuel")}
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
