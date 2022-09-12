import Matter from 'matter-js';
import React from 'react';
import { View } from 'react-native';

const SpritePlayer = props => {
    const wBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const hBody = props.body.bounds.max.y - props.body.bounds.min.y;
    const xBody = props.body.position.x - wBody / 2;
    const yBody = props.body.position.y - hBody / 2;
    const color = props.color;

    return (
        <View style={{
            borderWidth: 1,
            borderColor: color,
            borderStyle: "solid",
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: wBody,
            height: hBody,
            backgroundColor: color
        }} />
    );
};

export default (world,color, pos, size) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'player',
    mass: 1,
    frictionAir: 0.005,
    friction: 0.0001,
    frictionStatic: 0.0,
    restitution: 0.3,
    density: 0.1,
    isStatic: false,
    isSensor: false,
});
    const isFalling = true;
    const toUp = false;

    Matter.World.add(world, body);

    return {
        body,
        color,
        pos,
        renderer: <SpritePlayer />,
        vars : {isFalling, toUp}
    };
}
