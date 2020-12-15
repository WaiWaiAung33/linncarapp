import React from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native";

export default class DriverListCard extends React.Component{
    render(){
        return(
            <View style={styles.container}>
               <View style={styles.secondContainer}>
                    <View style={styles.circle}>
                    <Image source={require("@images/car.png")} />
                    </View>
                    <View style={{justifyContent:"center",marginLeft:10}}>
                        <Text style={styles.text}>U Yarzar Phyo</Text>
                        <Text style={styles.text}>09457368363</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"flex-end",flex:1,paddingRight:10}}>
                        <Image source={require("@images/phone.png")} style={{width:28,height:25}}/>
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
    secondContainer:{
        flexDirection:"row",
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        borderWidth:1,
        padding:5,
        borderRadius:5,
        borderColor:"#3D73D5"
    },
    circle:{
        width: 80,
        height: 80,
        backgroundColor: "#DCE6EC",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "#DCE6EC",
       
    },
    text:{
        paddingTop:10,
        fontSize:16
    }
})