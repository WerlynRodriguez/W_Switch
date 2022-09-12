import { Text, TouchableOpacity,StyleSheet } from "react-native";
import { defMargin } from "../../constants";

export default function PlayButton({onPress}) {
    const styles = StyleSheet.create({
        appButtonContainer: {
          elevation: 8,
          width: "100%",
          backgroundColor: "#009688",
          borderRadius: 25,
          marginTop: 10,
          paddingVertical: 10,
          paddingHorizontal: 12
        },
        appButtonText: {
          fontSize: 25,
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
            <Text style={styles.appButtonText}> Jugar </Text>
        </TouchableOpacity>
    )
}