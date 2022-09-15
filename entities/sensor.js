import Matter from 'matter-js';
import React from 'react';
import { View } from 'react-native';

const SpriteSensor = props => {
    const wBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const hBody = props.body.bounds.max.y - props.body.bounds.min.y;
    const color = props.color;

    return (
        <View style={{
            position: 'absolute',
            left: props.body.position.x,
            top: props.body.position.y,
            width: wBody,
            height: hBody,
            backgroundColor: color
        }} />
    );
}

export default (world,color, pos, size) => {
    const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
        label: "sensor",
        isSensor: true,
    })
    Matter.World.add(world, body);
    return {
        body,
        color,
        pos,
        renderer: <SpriteSensor />
    };
}