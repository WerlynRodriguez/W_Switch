import { View,Text, ImageBackground } from "react-native";
import NorButton from "./UICustomComp/NorButton";
import { defMargin } from '../constants';
import bgHome from '../assets/bgHome.jpg';
import { colors } from "../colors";

export default function Credits({navigation}) {
    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground source={bgHome} resizeMode='cover' blurRadius={10}
            style={{flex:1,flexDirection:'column',alignItems:"center",justifyContent:"center",padding:defMargin}}>
                
                <View style={{padding:20,borderRadius:25,backgroundColor:"rgba(0,0,0,0.25)"}}>
                    <Text style={{fontSize:40}}>Diseño y Programación</Text>
                    <Text style={{fontSize:30}}>Werlyn Rodriguez Diaz</Text>
                    <Text style={{fontSize:25}}>Estudiante de Ingenieria en Computacion</Text>
                    <Text style={{fontSize:40}}>Juego Original</Text>
                    <Text style={{fontSize:30}}>Juego G_Switch: Vasco Freitas</Text>
                </View>
                
                
            </ImageBackground>
            <View style={{position:"absolute",top:0,left:0,right:0,backgroundColor:colors.tableColor,height:60,alignItems:"center"}}>
                <Text style={{fontSize:50,color:colors.white,fontWeight:"bold"}}>Credits</Text>
            </View>
            <View style={{position:"absolute",bottom:0,left:0,marginBottom:defMargin,marginLeft:defMargin,width:150}}>
                    <NorButton title="Atrás" onPress={()=>{navigation.goBack()}}/>
            </View>
            
        </View>
    );
}