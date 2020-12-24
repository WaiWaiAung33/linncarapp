import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import Moment from "moment";

import { ImgDriveruploadApi } from "@api/Url";

export default class DireverListDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  _handlePhoneCall(number) {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }

  render() {
    const data = this.props.navigation.getParam("datas");
    // console.log("Data",data);
    return (
      <View style={styles.container}>
        {data.dphoto ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{
                uri: ImgDriveruploadApi + data.dphoto,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: 10,
              }}
            />

            <Text style={{ paddingTop: 10, fontSize: 16 }}>{data.dname}</Text>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.firstCircle}>
              <Image
                source={require("@images/driver.png")}
                style={{ width: 150, height: 150 }}
              />
            </View>
            <Text style={{ paddingTop: 10, fontSize: 16 }}>{data.dname}</Text>
          </View>
        )}

        <ScrollView>
          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image
                source={require("@images/phone2.png")}
                style={styles.img}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this._handlePhoneCall(data.phone)}
              >
                <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                  {data.phone}
                </Text>
              </TouchableOpacity>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Phone No
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/pin.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {data.address}
              </Text>

              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Current Address
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/cake.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {Moment(data.dob).format("DD-MM-YYYY")}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Birthday
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image
                source={require("@images/nrc.png")}
                style={{ width: 70, height: 70 }}
              />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {data.nrc}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                NRC
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image
                source={require("@images/calendar1.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {Moment(data.licenceexpiredate).format("DD-MM-YYYY")}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Lincence Expire Date
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  firstCircle: {
    width: 120,
    height: 120,
    backgroundColor: "#DCE6EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 60,
    borderColor: "#DCE6EC",
    marginTop: 10,
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: "#DCE6EC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#DCE6EC",
    marginTop: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
});
