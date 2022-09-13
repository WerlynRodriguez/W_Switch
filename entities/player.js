import Matter from 'matter-js';
import React from 'react';
import { Text, View } from 'react-native';

const SpritePlayer = props => {
    const wBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const hBody = props.body.bounds.max.y - props.body.bounds.min.y;
    const xBody = props.body.position.x - wBody / 2;
    const yBody = props.body.position.y - hBody / 2;
    const color = props.color;

    return (
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: wBody,
            height: hBody,
            backgroundColor: color,
            //ransform: [{ rotate: `${props.body.angle}rad` }]

        }} >
            <Text>{props.vars.sensors[0]? "Up":""}</Text>
            <Text>{props.vars.sensors[1]? "Down":""}</Text>
            <Text>{props.vars.sensors[2]? "Left":""}</Text>
            <Text>{props.vars.sensors[3]? "Right":""}</Text>
        </View>
    );
};//<Text>{(props.vars.toUp? "up ":"down ")+(props.vars.isFalling? "f":"n")}</Text>

export default (world,color, pos, size,n) => {
    const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'player'+n,
    isStatic: false});
    
    var isFalling = true;
    var toUp = false;
    // pos 0: Up, 1: Down, 2: Left, 3: Right
    var sensors = [false,false, false, false];

    Matter.World.add(world, body);

    return {
        body,
        color,
        pos,
        renderer: <SpritePlayer />,
        vars : {isFalling, toUp, sensors}
    };
}

export function ChangeToUp(player, v) {
    if (v) {if (player.vars.isFalling) {return false;}}
    
    player.vars.toUp = !player.vars.toUp;
    if (player.vars.toUp) {
        if (player.vars.sensors[0]) {
            return false;
        }
    } else {
        if (player.vars.sensors[1]) {
            return false;
        }
    }
    player.vars.isFalling = true;
    
    return true;
}

export function Falling(player, v, velocity) {
    if (v) {if (!player.vars.isFalling) {return false;}}

    Matter.Body.translate(player.body, { x: 0, y: player.vars.toUp ? -velocity : velocity });
}

export function TouchFloor(player, v) {
    if (v) {if (!player.vars.isFalling) {return false;}}

    player.vars.isFalling = false;
    return true;    
}

//Where is Touching me
function WITM (playerA, playerB, vertex, status){
    if (playerA.body.position.x > playerB.body.position.x && vertex.x > playerB.body.position.x) {
        playerA.vars.sensors[2] = status;
        playerB.vars.sensors[3] = status;
    }
    else if (playerA.body.position.x <= playerB.body.position.x && vertex.x <= playerB.body.position.x) {
        playerA.vars.sensors[3] = status;
        playerB.vars.sensors[2] = status;
    }
    else if (playerA.body.position.y > playerB.body.position.y && vertex.y > playerB.body.position.y) {
        playerA.vars.sensors[0] = status;
        playerB.vars.sensors[1] = status;
    }
    else {
        playerA.vars.sensors[1] = status;
        playerB.vars.sensors[0] = status;
    }
}

//Start Touching Player
export function StTgPr(playerA, playerB, vertex) {
    // Determine where is the other player
    WITM(playerA,playerB,vertex,true);

    // ALL posible cases playerA
    if (playerA.vars.isFalling) {
        if (!playerB.vars.isFalling) {
            playerA.vars.isFalling = false;
        } else if (playerA.vars.toUp != playerB.vars.toUp) {
            playerA.vars.isFalling = false;
            playerB.vars.isFalling = false;
        }
    }
    //All posible cases playerB
    if (playerB.vars.isFalling) {
        if (!playerA.vars.isFalling) {
            playerB.vars.isFalling = false;
        }
    }
}

//End Touching Player
export function EdTgPr(playerA, playerB, vertex){
    WITM(playerA,playerB,vertex,false);
}