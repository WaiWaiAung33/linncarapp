import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Moment from "moment";

export default class CarDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.navigation.getParam("datas");
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.firstCircle}>
            <Image
              source={require("@images/car.png")}
              style={{ width: 80, height: 80 }}
            />
          </View>
          <Text style={{ paddingTop: 10, fontSize: 16 }}>{data.car_no}</Text>
        </View>
        <ScrollView>
          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/car.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {data.model}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Model
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/car.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {data.color}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Color
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/car.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
                {data.remark ? data.remark : "No remark to show"}
              </Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Remark
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/car.png")} style={styles.img} />
            </View>
            <View>
              <Text style={{ paddingLeft: 10, paddingTop: 10 }}>41267</Text>
              <Text style={{ paddingTop: 15, paddingLeft: 10, color: "gray" }}>
                Latest Kilo
              </Text>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.circle}>
              <Image source={require("@images/car.png")} style={styles.img} />
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
