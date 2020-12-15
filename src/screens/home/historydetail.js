import React from "react";
import {View,Text,ScrollView,StyleSheet,TextInput,TouchableOpacity} from "react-native";

//import components
import DropDown from "@components/DropDown";
import ImgUploadBtn from "@components/ImgUploadBtn";

export default class HistoryDetail extends React.Component{
    render(){
        return(
            <View style={styles.container}>
            <ScrollView>
             <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Name</Text>
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
                    <Text style={styles.labelStyle}>Car No</Text>
                </View>
                <View style={styles.textInputContainer}>
                <DropDown
                //   value={this.state.branch}
                  widthContainer="100%"
                //   options={this.state.branches}
                //   onSelect={(value, label) =>
                //     this._handleOnSelectBranch(value, label)
                //   }
                  placeholder="Select Branch..."
                ></DropDown>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Usage Name</Text>
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
                    <Text style={styles.labelStyle}>Start Place</Text>
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
                    <Text style={styles.labelStyle}>End Place</Text>
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
                    <Text style={styles.labelStyle}>Reson</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                    // keyboardType="number-pad"
                    style={styles.textAreaStyle}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>Start Kilo</Text>
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
                    <Text style={styles.labelStyle}>End Kilo</Text>
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
                    <Text style={styles.labelStyle}>Driving Kilo</Text>
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
                    <Text style={styles.labelStyle}>Start Kilo Photo</Text>
                </View>
                {/* <View style={styles.textInputContainer}> */}
                    <ImgUploadBtn
                    // imagePath={this.state.imagePath}
                    // onChooseImage={this._handleOnChooseImage.bind(this)}
                     />
                {/* </View> */}
            </View>

            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelStyle}>End Kilo Photo</Text>
                </View>
                {/* <View style={styles.textInputContainer}> */}
                    <ImgUploadBtn
                    // imagePath={this.state.imagePath}
                    // onChooseImage={this._handleOnChooseImage.bind(this)}
                     />
                {/* </View> */}
            </View>

            </ScrollView>
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
      textAreaStyle: {
        borderColor: "#ffffff",
        borderWidth: 1,
        minHeight: 80,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: "#ffffff",
        textAlignVertical:"top"
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
      },
})
