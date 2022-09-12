import { View, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../../colors";

//Beatiful card player
export default function CardPlayer({index,number,onDelete}) {
    return (
        <View style={{display:"flex",flexDirection:'column',alignItems:"center",marginLeft:"1%",width:"15%",height:"50%",
        borderWidth:5,borderRadius:20,backgroundColor:colors.tableColor,
        borderTopColor:colors.white,borderBottomColor:colors.tableColor,borderLeftColor:colors.white,borderRightColor:colors.white}}>
            <TouchableOpacity onPress={()=>{onDelete(index)}} style={{position:"relative",bottom:20,backgroundColor:colors.PrimaryColor,
            alignItems:"center",justifyContent:"center",padding:5,width:50,height:50,borderRadius:"50%",borderColor:colors.white,borderWidth:5}}>
                <Text style={{fontSize:20,color:colors.white,fontWeight:"bold"}}>X</Text>
            </TouchableOpacity>
            <Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>{number}</Text>

            <Image style={{width:"80%",height:"40%"}} source={require("../../assets/bgHome.jpg")}/>

        </View>
    );
}