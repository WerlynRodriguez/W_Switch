import Matter from "matter-js"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import floor from "../entities/floor";
import player from "../entities/player";
import { getAspectRatio } from "../constants";


export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let Sizes = getAspectRatio();
    engine.gravity.y = 0.0;

    return {
        physics: { engine, world },
        player: player(world, "blue", { x: 50, y: 200 }, { width: 40, height: 40 }),
        floor: floor(world, "green", { x: Sizes.width / 2, y: 10 }, { width: Sizes.width, height: 20 }),
        floor2: floor(world, "green", { x: Sizes.width/2, y: Sizes.height-10 }, { width: Sizes.width, height: 20 })
    }
}