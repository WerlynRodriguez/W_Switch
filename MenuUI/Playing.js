import Matter from "matter-js";
import { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import components from "../components";
import { getAspectRatio } from "../constants";


export default function Playing({navigation}) {
    const [hasTouch, setHasTouch] = useState(false);
    let Sizes = getAspectRatio();

    //Update loop
    const physics = (entities, { touches, time, dispatch }) => {
        let engine = entities.physics.engine;
        let isFalling = entities.player.vars.isFalling; //Check if player is falling
        let toUp = entities.player.vars.toUp; //Check players direction gravity

        if (hasTouch) {
            setHasTouch(false);
            if (!isFalling) {
                entities.player.vars.isFalling = true;
                entities.player.vars.toUp = !toUp;
            }
            
        }

        Matter.Events.on(engine, "collisionStart", (event) => {
            const pairs = event.pairs;
            pairs.forEach((pair) => {
                if (pair.bodyA.label === "player" && pair.bodyB.label === "floor") {
                    let isFalling = entities.player.vars.isFalling;
                    if (isFalling) {
                        entities.player.vars.isFalling = false;
                    }
                }
            });
        });

        Matter.Body.setVelocity(entities.player.body, { x: 0, y: entities.player.vars.toUp ? -9.8 : 9.8 });
        Matter.Engine.update(engine, time.delta);
        return entities;
    }

    return (
        <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <GameEngine style={{width:Sizes.width,height:Sizes.height}}
            systems={[physics]} entities={components()}>
            </GameEngine>

            <TouchableOpacity style={{position:"absolute",right:0,bottom:0,width:100,height:100,backgroundColor:"rgba(0,0,0,0.5)"}}
            onPress={() => setHasTouch(true)}>
                <Text>Jump</Text>
            </TouchableOpacity>
        </View>
    );
}/*<GameEngine style={{width:Sizes.width,height:Sizes.height,backgroundColor:"black"}}
            systems={[physics]} entities={components()}>
            </GameEngine> */