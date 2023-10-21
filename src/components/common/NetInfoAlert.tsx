import React, { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

const NetInfoAlert: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = NetInfo.addEventListener(state => {
                const isVisible = !state.isConnected;

                if (isVisible) {
                    setIsVisible(true);
                    
                    Animated.timing(
                        fadeAnim,
                        {
                            delay: 500,
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true
                        },
                    ).start(() => {
                        Animated.timing(
                            fadeAnim,
                            {
                                delay: 2000,
                                toValue: 0,
                                duration: 1000,
                                useNativeDriver: true
                            },
                        ).start(() => {
                            setIsVisible(false);
                        });
                    });
                }
            });

            return () => unsubscribe();
        }, [])
    );

    if (isVisible) {
        return (
            <Animated.View style={{
                ...styles.container,
                opacity: fadeAnim
            }}>
                <Text style={styles.text}>No internet connection</Text>
            </Animated.View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 60,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .9)',
        alignSelf: 'center',
        bottom: 20,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
    }
});

export default NetInfoAlert;
