import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const defMargin = 25;

//Aspect Ratio 16:9
export const getAspectRatio = () => {
    let width = SCREEN_WIDTH;
    let height = SCREEN_HEIGHT;
    let ratio = 16/9;

    if (width/height > ratio) {
        width = height * ratio;
    } else {
        height = width / ratio;
    }

    console.log(width, height);
    return { width, height };
}

