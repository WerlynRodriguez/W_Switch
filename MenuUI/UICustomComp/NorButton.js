import { TouchableOpacity } from "react-native";
import { Text, StyleSheet} from 'react-native';

//Normal Button
export default function NorButton(props) {
    const {title, onPress, style} = props;

    const styles = StyleSheet.create({
        appButtonContainer: {
          elevation: 8,
          width: "100%",
          backgroundColor: "#400022",
          borderRadius: 25,
          marginTop: 10,
          paddingVertical: 10,
          paddingHorizontal: 12
        },
        appButtonText: {
          fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          alignSelf: "center",
        }
      });

    const eventOnPress = () => {
        if (onPress === undefined) return;
        if (typeof onPress !== "function") return;
        onPress();
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{eventOnPress()}} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}> {title} </Text>
        </TouchableOpacity>
    )
}