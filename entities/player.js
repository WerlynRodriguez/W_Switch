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
    isSensor: true,
    });
    
    var isFalling = true;
    var isInFloor = false;
    var toUp = false;
    // pos 0: Up, 1: Down, 2: Left, 3: Right For players
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

export function ChangeToUp(player) {
    if (player.vars.isFalling) {return;}

    player.vars.toUp = !player.vars.toUp;
}

export function Falling(player, velocity) {
    if (player.vars.toUp) {
        if (!player.vars.sensors[0]){
            Matter.Body.translate(player.body, {x: 0, y: -velocity});
            player.vars.isFalling = true;
        } else {
            player.vars.isFalling = false;
        }
    } else {
        if (!player.vars.sensors[1]){
            Matter.Body.translate(player.body, {x: 0, y: velocity});
            player.vars.isFalling = true;
        } else {
            player.vars.isFalling = false;
        }
    }
}

export function TouchFloor(player, status, contacts) {
    //Check if floor is up down left or right
    var vertex = contacts[contacts.length > 2? 2:0].vertex;
    if(player.body.position.y > vertex.y) {
        player.vars.sensors[0] = status;
    } else if (player.body.position.y < vertex.y) {
        player.vars.sensors[1] = status;
    } else if (player.body.position.x > vertex.x) {
        player.vars.sensors[2] = status;
    } else if (player.body.position.x < vertex.x) {
        player.vars.sensors[3] = status;
    } else {
        console.log("Error in TouchFloor");
    }

    /*if (player.vars.toUp){
        player.vars.sensors[status? 0:1] = status;
    } else {
        player.vars.sensors[status? 1:0] = status;
    }*/
}

//Where is Touching me
function WITM (playerA, playerB, vertex, status){
    /*if (playerA.body.position.x > playerB.body.position.x && vertex.x > playerB.body.position.x) {
        playerA.vars.sensors[2] = status;
        playerB.vars.sensors[3] = status;
        return "L";
    }
    else if (playerA.body.position.x <= playerB.body.position.x && vertex.x <= playerB.body.position.x) {
        playerA.vars.sensors[3] = status;
        playerB.vars.sensors[2] = status;
        return "R";
    }
    else */if (playerA.body.position.y > playerB.body.position.y && vertex.y > playerB.body.position.y) {
        playerA.vars.sensors[0] = status;
        playerB.vars.sensors[1] = status;
        return "U";
    }
    /*else {
        playerA.vars.sensors[1] = status;
        playerB.vars.sensors[0] = status;
        return "D";
    }*/
}

//Start Touching Player
export function StTgPlayer(playerA, playerB, vertex) {
    let side = WITM(playerA, playerB, vertex, true);
}

//End Touching Player
export function EnTgPlayer(playerA, playerB, vertex){
    let side = WITM(playerA, playerB, vertex, false);
}