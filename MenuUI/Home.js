import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { defMargin } from '../constants';
import NorButton from './UICustomComp/NorButton';
import bgHome from '../assets/bgHome.jpg';

export default function Home() {
    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground source={bgHome} resizeMode='cover' style={{flex:1,flexDirection:'row',padding:defMargin}}>

            <View style={{flex:0.7,borderColor:"red",borderWidth:2}}>
                <Text>Home Screen</Text>
            </View>
            <View style={{flex:0.3,justifyContent:"center",alignItems:"center",borderColor:"green",borderWidth:2,borderRadius:25}}>
                <Text style={{fontSize:25,fontWeight:"bold",color:"white"}}>W_Switch</Text>
                <NorButton title="MultiLogic" onPress={()=>{console.log("Login")}}/>
                <NorButton title="Credits" onPress={console.log("ADGJ") }/>
            </View>

            </ImageBackground>
        </View>
    );
}