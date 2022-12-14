import Matter from "matter-js";
import { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import components from "../components";
import { getAspectRatio, VelocityYPlayer } from "../constants";
import { ChangeToUp, Falling, TouchFloor, StTgPlayer, EnTgPlayer } from "../entities/player";


export default function Playing({navigation}) {
    // Number of players
    const NPlayers = 3;
    const initTouches = () => {
        let touches = [];
        for (let i = 0; i < NPlayers; i++) {
            touches.push(false);
        }
        return touches;
    }

    // Players touches
    const [PsTs,setPsts] = useState(initTouches());
    var idLastPairs = [];

    const Sizes = getAspectRatio();
    let newVelocityYPlayer = Sizes.height * (VelocityYPlayer / 100);

    const isPlayerLabel = (label) => {
        // Check for the 7 caracter of the label if is an number and 6 is r
        let sc = label[6] !== undefined ? label[6] : false;
        let xc = label[5] !== undefined ? label[5] == "r" ? true : false : false;
        return (!isNaN(sc) && xc);
    }

    //Check events of the game for end or start
    const checkEventsCollision = (event, onThFloor, onThPlayer) => {
        const pairs = event.pairs;
        pairs.forEach((pair) => {
            let idPair = pair.id;
            if (!idLastPairs.includes(idPair)) {
                idLastPairs.push(idPair);

                let isBodyAPlayer = isPlayerLabel(pair.bodyA.label);
                let isBodyBPlayer = isPlayerLabel(pair.bodyB.label);
                if (pair.bodyB.label === "floor") {
                    if (isBodyAPlayer) {
                        onThFloor(pair.bodyA.label, pair.contacts);
                    }
                }

                if (isBodyAPlayer && isBodyBPlayer) {
                    //console.log(pair)
                    onThPlayer(pair.bodyA.label, pair.bodyB.label, pair.contacts[6].vertex);
                }
            }
        });
        idLastPairs = [];
    }

    //Update loop
    const physics = (entities, { touches, time, dispatch }) => {
        let engine = entities.physics.engine;
        //console.log(time)
        Matter.Events.on(engine, "collisionStart", (event) => {
            checkEventsCollision(event, (label, contacts) => {
                TouchFloor(entities[label], true, contacts);
            }, (labelA, labelB, contact) => {
                StTgPlayer(entities[labelA], entities[labelB], contact);
            });
        });

        //Check all collisions ending
        Matter.Events.on(engine, "collisionEnd", (event) => {
            checkEventsCollision(event, (label, contacts) => {
                TouchFloor(entities[label], false, contacts);
            }, (labelA, labelB, contact) => {
                EnTgPlayer(entities[labelA], entities[labelB], contact);
            });
        });
        
        //Check for all touches
        for (let i = 0; i < PsTs.length; i++) {
            if (PsTs[i]) {
                setPsts((prev) => {
                    let newPsTs = [...prev];
                    newPsTs[i] = false;
                    return newPsTs;
                });
                ChangeToUp(entities["player" + (i + 1)]);
            }
            
            Falling(entities["player" + (i + 1)], newVelocityYPlayer);
        }

        Matter.Engine.update(engine, time.delta);
        return entities;
    }

    return (
        <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <GameEngine style={{width:Sizes.width,height:Sizes.height}}  onEvent={(e) => {
            }}
            systems={[physics]} entities={components()}>
            </GameEngine>

            <TouchableOpacity style={{position:"absolute",right:0,bottom:0,width:100,height:100,backgroundColor:"rgba(0,0,0,0.5)"}}
            onPress={() => setPsts((prev) => {
                let newPsTs = [...prev];
                newPsTs[0] = true;
                return newPsTs;
            })}>
                <Text>Jump blue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:"absolute",left:0,right:0,bottom:0,width:100,height:100,backgroundColor:"rgba(0,0,0,0.5)"}}
            onPress={() => setPsts((prev) => {
                let newPsTs = [...prev];
                newPsTs[1] = true;
                return newPsTs;
            })}>
                <Text>Jump Red</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:"absolute",left:0,top:0,width:100,height:100,backgroundColor:"rgba(0,0,0,0.5)"}}
            onPress={() => setPsts((prev) => {
                let newPsTs = [...prev];
                newPsTs[2] = true;
                return newPsTs;
            })}>
                <Text>Jump black</Text>
            </TouchableOpacity>
        </View>
    );
}/*<GameEngine style={{width:Sizes.width,height:Sizes.height,backgroundColor:"black"}}
            systems={[physics]} entities={components()}>
            </GameEngine> */