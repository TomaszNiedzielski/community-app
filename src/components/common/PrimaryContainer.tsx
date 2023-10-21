import React, { useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import Colors from '../../constants/Colors';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
    statusBarColor?: string;
}

const PrimaryContainer: React.FC<Props> = ({ children, style, statusBarColor }) => {
    useFocusEffect(useCallback(() => {
        // StatusBar.setBackgroundColor(statusBarColor || Colors.dark);
    }, []));

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
}

export const SCREEN_PADDING = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.dark,
    }
});

export default PrimaryContainer;
