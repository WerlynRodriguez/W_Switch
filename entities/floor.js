import Matter from 'matter-js';
import React from 'react';
import { View } from 'react-native';

const SpriteFloor = props => {
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
            backgroundColor: color
        }} />
    );
};

export default (world,color, pos, size) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'floor',
    isStatic: true,
});

    Matter.World.add(world, body);

    return {
        body,
        color,
        pos,
        renderer: <SpriteFloor />
    };
}