import { View,Text,ImageBackground } from "react-native";
import NorButton from "./UICustomComp/NorButton";
import { defMargin } from '../constants';
import bgHome from '../assets/bgHome.jpg';
import { colors } from "../colors";

export default function SelectPlayers({navigation}) {
    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground source={bgHome} resizeMode='cover' blurRadius={10}
            style={{flex:1,flexDirection:'column',alignItems:"center",padding:defMargin}}>
                
                
                
            </ImageBackground>
            <View style={{position:"absolute",top:0,left:0,right:0,backgroundColor:colors.tableColor,height:60,alignItems:"center"}}>
                <Text style={{fontSize:50,color:colors.white,fontWeight:"bold"}}>Select Your Runner</Text>
            </View>
            <View style={{position:"absolute",bottom:0,left:0,marginBottom:defMargin,marginLeft:defMargin,width:150}}>
                    <NorButton title="Atrás" onPress={()=>{navigation.goBack()}}/>
            </View>
        </View>
    );
}