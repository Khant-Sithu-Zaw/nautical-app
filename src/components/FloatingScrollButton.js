import React, { useRef } from 'react';
import {
    Animated,
    PanResponder,
    Pressable,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/scale';
export default function FloatingScrollButton({ onScrollUp, onScrollDown }) {
    const pan = useRef(new Animated.ValueXY({ x: 260, y: 420 })).current;

    const panResponder = useRef(
        PanResponder.create({
            // Always allow PanResponder to capture gestures
            onStartShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2,
            onMoveShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2,

            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x.__getValue(),
                    y: pan.y.__getValue(),
                });
                pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),

            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.container, { transform: pan.getTranslateTransform() }]}
        >
            {/* UP */}
            <Pressable
                onPress={onScrollUp}
                style={styles.button}
                android_ripple={{ color: '#00000020', radius: 22 }}
            >
                <Text style={styles.arrow}>▲</Text>
            </Pressable>

            {/* DOWN */}
            <Pressable
                onPress={onScrollDown}
                style={styles.button}
                android_ripple={{ color: '#00000020', radius: 22 }}
            >
                <Text style={styles.arrow}>▼</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: scale(50),
        height: verticalScale(80),
        backgroundColor: 'rgba(27, 27, 27, 0.5)',
        borderRadius: 28,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    button: {
        width: scale(40),
        height: verticalScale(40),
        borderRadius: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: moderateScale(20),
        color: '#fff',
        fontWeight: 'bold',
    },
});

