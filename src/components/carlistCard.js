import React from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image} from "react-native";

export default class carlistCard extends React.Component{
    _OnPress(){
        if(this.props.onPress){
            this.props.onPress();
        }
    }
    _onPressUse(){
        if(this.props.onPressUse){
            this.props.onPressUse();
        }
    }
    render(){
        return(
            <View style={styles.container}>
              <View style={styles.card}>
                  <TouchableOpacity onPress={()=>this._OnPress()}>
                  <View style={styles.secondCard}>
                    <View style={styles.circle}>
                    <Image source={require("@images/car.png")} />
                    </View>
                    <View style={{flex:1,paddingLeft:8}}>
                        <Text style={styles.text}>{this.props.carno}</Text>
                        <Text style={styles.text}>{this.props.kilo} Kilo</Text>
                    </View>
                    <View style={{width:20,height:20,backgroundColor:this.props.status == 0 ? "green" : "yellow",
                    borderWidth:1,borderRadius:10,borderColor:this.props.status == 0 ? "green" : "yellow"}}/>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{flex:1}}></View>
                    <TouchableOpacity onPress={()=>this._onPressUse()}>
                    <View style={{flexDirection:"row",borderWidth:1,padding:3,
                    alignItems:"center",borderRadius:5 }}>
                    <Image source={require("@images/search.png")} />
                    <Text>Start Use</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                  </TouchableOpacity>

                 
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        marginLeft:10,
        marginRight:10,
        padding:10,
        borderWidth:1,
        borderColor:"#3D73D5",
        borderRadius:5,
        justifyContent:"center",
        marginTop:5
       
    },
    secondCard:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    circle:{
        width: 100,
        height: 100,
        backgroundColor: "#DCE6EC",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#DCE6EC",
       
    },
    text:{
        fontSize:16,
        paddingTop:15
    }
})