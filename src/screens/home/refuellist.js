import React from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native";

//import components
import RefuelCard from "@components/refuelCard";

export default class RefuelList extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <RefuelCard
                OnPress={()=>this.props.navigation.navigate("EditRefuel")}
                />
                <RefuelCard/>
                <View style={{flex:1,justifyContent:"flex-end",alignItems:"flex-end",margin:10}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreateRefuel")}>
                    <Image source={require("@images/addblue.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})