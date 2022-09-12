import { View,Text,ImageBackground,TouchableOpacity } from "react-native";
import NorButton from "./UICustomComp/NorButton";
import { defMargin } from '../constants';
import bgHome from '../assets/bgHome.jpg';
import { colors } from "../colors";
import CardPlayer from "./UICustomComp/CardPlayer";
import { useState } from "react";
import PlayButton from "./UICustomComp/PlayButton";


export default function SelectPlayers({navigation}) {

    const [players,setPlayers] = useState(["Werlyn","Maykol","Andy"]);
    const [btnAddVisible,setBtnAddVisible] = useState(true);

    function deletePlayer(index){
        if (players.length == 1) {return;} //No se puede eliminar el ultimo jugador
        setBtnAddVisible(true);

        let newPlayers = [...players];
        newPlayers.splice(index,1);
        setPlayers(newPlayers);
    }

    function addPlayer(){
        if (players.length == 5) {setBtnAddVisible(false);} //No se puede agregar mas de 6 jugadores

        let newPlayers = [...players];
        newPlayers.push("Player "+(newPlayers.length+1));
        setPlayers(newPlayers);
    }

    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground source={bgHome} resizeMode='cover' blurRadius={10}
            style={{flex:1,flexDirection:'row',alignItems:"center",justifyContent:"center"}}>

                {players.map((player,index)=>{return (
                <CardPlayer key={index} index={index} number={player} onDelete={(index)=>{deletePlayer(index)}}/>);
                })}

                <TouchableOpacity onPress={()=>{addPlayer()}} style={{display:btnAddVisible?"":"none",position:"relative",bottom:20,backgroundColor:colors.PrimaryColor,marginLeft:"1%",
                alignItems:"center",justifyContent:"center",padding:5,width:60,height:60,borderRadius:"50%",borderColor:colors.white,borderWidth:5}}>
                    <Text style={{fontSize:20,color:colors.white,fontWeight:"bold"}}>+</Text>
                </TouchableOpacity>

            </ImageBackground>
            <View style={{position:"absolute",top:0,left:0,right:0,backgroundColor:colors.tableColor,height:"10%",alignItems:"center"}}>
                <Text style={{fontSize:50,color:colors.white,fontWeight:"bold"}}>Select Your Runner</Text>
            </View>
            <View style={{position:"absolute",bottom:0,left:0,marginBottom:defMargin,marginLeft:defMargin,width:150}}>
                <NorButton title="Atrás" onPress={()=>{navigation.goBack()}}/>
            </View>
            <View style={{position:"absolute",bottom:0,right:0,marginBottom:defMargin,marginRight:defMargin,width:150}}>
                <PlayButton onPress={()=>{navigation.navigate("Playing")}}/>
            </View>
        </View>
    );
}