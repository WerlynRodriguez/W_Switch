import { Text, View, ImageBackground, Alert, BackHandler } from 'react-native';
import { useEffect } from 'react';
import { defMargin } from '../constants';
import NorButton from './UICustomComp/NorButton';
import bgHome from '../assets/bgHome.jpg';

export default function Home({navigation}) {
    useEffect(() => {
        setBackHandler();
    }, [])

    function setBackHandler() {
        const backAction = () => {
            Alert.alert("¿Estas Seguro?", "¿Realmente quieres salir del juego?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Salir", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }
    
    return (
        <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground source={bgHome} resizeMode='cover' style={{flex:1,flexDirection:'row',padding:defMargin}}>

            <View style={{flex:0.7,borderColor:"red",borderWidth:2}}>
                <Text>Home Screen</Text>
            </View>
            <View style={{flex:0.3,justifyContent:"center",alignItems:"center",borderColor:"green",borderWidth:2,borderRadius:25}}>
                <Text style={{fontSize:50,fontWeight:"bold",color:"white"}}>W_Switch</Text>
                <NorButton title="MultiPlayer" onPress={()=>{navigation.navigate("SelPlayers")}}/>
                <NorButton title="Credits" onPress={()=>{navigation.navigate("Credits")}}/>
            </View>

            </ImageBackground>
        </View>
    );
}