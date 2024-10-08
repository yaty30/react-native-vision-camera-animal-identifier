import React, { useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { View, Animated, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

type ImageSourcePropType = {
    uri?: string;
    width?: number;
    height?: number;
} | number;

interface Props {
    duration: number[];
    outputRange: number[];
    imagePath: ImageSourcePropType;
    margin: number;
}

const AnimatedAnimals = observer(({ duration, outputRange, imagePath, margin }: Props) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const flipValue = useRef(new Animated.Value(0)).current;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        image: {
            opacity: 0.15,
            marginTop: margin,
        },
    });

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: duration[0],
                    useNativeDriver: false,
                }),
                Animated.timing(flipValue, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: duration[1],
                    useNativeDriver: false,
                }),
                Animated.timing(flipValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: outputRange,
    });

    const scaleX = flipValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, -1],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[{ transform: [{ translateX }, { scaleX }] }]}>
                <Image source={imagePath} style={styles.image} />
            </Animated.View>
        </View>
    );
});

export default AnimatedAnimals;