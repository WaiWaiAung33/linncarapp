import React from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from "react-native";

//import components
import DropDown from "@components/DropDown";
import ImgUploadBtn from "@components/ImgUploadBtn";

export default class CreateRefuel extends React.Component{
    render(){
        return(
            <View style={styles.container}>

              <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Driver Name</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <DropDown widthContainer="100%"/>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Driver Name</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                    // keyboardType="number-pad"
                    style={styles.textInputStyle}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Kilo</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                    // keyboardType="number-pad"
                    style={styles.textInputStyle}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Price</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                    // keyboardType="number-pad"
                    style={styles.textInputStyle}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Voucher</Text>
                </View>
              
                <ImgUploadBtn
                    // imagePath={this.state.imagePath}
                    // onChooseImage={this._handleOnChooseImage.bind(this)}
                     />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                {/* <TouchableOpacity style={styles.backBtn}>
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.saveBtn}
                //   onPress={() => this.createSimcard()}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    formContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
      },
      textContainer: {
        width: "30%",
        // alignItems: "flex-end",
        justifyContent: "center",
      },
      textInputContainer: {
        flex: 1,
        marginLeft: 20,
      },
      labelStyle: { fontSize: 15 },
      textInputStyle: {
        borderColor: "#ffffff",
        backgroundColor:"#ffffff",
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
      },
      btnContainer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20,
      },
      saveBtn: {
        backgroundColor: "#0470DD",
        height: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop:10
      },
})