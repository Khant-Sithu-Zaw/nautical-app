// WaveBottom.js
import React, { useRef, useEffect } from "react";
import { Animated, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { verticalScale } from '../utils/scale';
const { width, height: screenHeight } = Dimensions.get("window");

export default function WaveBottom({
    fill,
    height,       // base from bottom
    amplitude,    // wave height
    speed,      // main wave speed
    points,        // number of peaks
}) {
    const anim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef(null);

    useEffect(() => {
        // Create a looping animation
        const loopAnimation = Animated.loop(
            Animated.timing(anim, {
                toValue: 1,
                duration: speed,
                useNativeDriver: false,
            })
        );

        animationRef.current = loopAnimation;
        loopAnimation.start();

    }, []);

    const getPath = (phase) => {
        const segment = width / points;
        let path = `M0 ${screenHeight}`;

        for (let i = 0; i <= points; i++) {
            const x = i * segment;
            const y = screenHeight - height + Math.sin(phase + i * 0.8) * amplitude;
            const cx = x - segment / 2;
            const cy = screenHeight - height + Math.sin(phase + (i - 0.5) * 0.8) * amplitude;
            path += ` Q ${cx} ${cy} ${x} ${y}`;
        }

        path += ` L ${width} ${screenHeight} L0 ${screenHeight} Z`;
        return path;
    };

    const [d, setD] = React.useState(getPath(0));

    useEffect(() => {
        const id = anim.addListener(({ value }) => {
            setD(getPath(value * 2 * Math.PI));
        });
        return () => anim.removeListener(id);
    }, []);

    return (
        <Svg
            width={width}
            height={screenHeight}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
            <Path d={d} fill={fill} />
        </Svg>
    );
}
