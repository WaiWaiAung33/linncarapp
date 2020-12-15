import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

//import components
import DriverListCard from "@components/dirverlistCard";

export default class DriverList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextInput}>
            <TextInput
              style={styles.textSearch}
              placeholder="Search ..."
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
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
          Total = 10
        </Text>

        <DriverListCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer:{
    // flex: 1,
flexDirection: "row",
justifyContent: "space-between",
paddingHorizontal: 10,
// width: "100%",
alignItems: "center",
marginTop:10
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
 searchBtn:{
   backgroundColor: "#0470DD",
   width: "15%",
   height: 40,
   marginLeft: 10,
   borderRadius: 5,
   alignItems: "center",
   justifyContent: "center",
 },
 textSearch:{
      flex: 1, 
      height: 40,
       paddingHorizontal: 10 
   }
});
