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

    return { width, height };
}

// Game constants in percentage (for responsive) This will be in a db later precalculated
export const SizePlayer = { width: 4.245, height: 7.291 };
export const SizeFloor = { width: 100, height: 7.291 };
export const VelocityYPlayer = 1.276;