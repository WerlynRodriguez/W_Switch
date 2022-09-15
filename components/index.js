import Matter from "matter-js"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import floor from "../entities/floor";
import player from "../entities/player";
import { getAspectRatio, SizePlayer, SizeFloor } from "../constants";
import sensor from "../entities/sensor";


export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    // This variable will be in a db later
    let Sizes = getAspectRatio();
    let newSizePlayer = {
        width: Sizes.width * (parseInt(SizePlayer.width) / 100),
        height: Sizes.height * (parseInt(SizePlayer.height) / 100)
    }
    let newSizeFloor = {
        width: Sizes.width * (parseInt(SizeFloor.width) / 100),
        height: Sizes.height * (parseInt(SizeFloor.height) / 100)
    }

    engine.gravity.y = 0.0;
    engine.gravity.x = 0.0;

    // --------WARNING--------
    //NEVER USE CARACTER NUMBER IN POS 6 AND R IN POS 5
    // -----------------------
    return {
        physics: { engine, world },
        player1: player(world, "blue", { x: 50, y: 300 }, newSizePlayer, 1),
        player2: player(world, "red", { x: 50, y: 200 }, newSizePlayer, 2),
        player3: player(world, "black", { x: 50, y: 100 }, newSizePlayer, 3),
        floor: floor(world, "green", { x: Sizes.width / 2, y: (newSizeFloor.height / 2) }, newSizeFloor),
        floor2: floor(world, "green", { x: Sizes.width/2, y: Sizes.height - (newSizeFloor.height / 2) }, newSizeFloor),
    }
}/*player2: player(world, "red", { x: 60, y: 200 }, newSizePlayer, 2),
        player3: player(world, "green", { x: 70, y: 100 }, newSizePlayer, 3), */