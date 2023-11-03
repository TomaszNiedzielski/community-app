import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Colors, { Theme } from '../../constants/Colors';
import { useSelector } from 'react-redux';
// import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '../../redux/store';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
    statusBarColor?: string;
}

const PrimaryContainer: React.FC<Props> = ({ children, style, statusBarColor }) => {
    // useFocusEffect(useCallback(() => {
        // StatusBar.setBackgroundColor(statusBarColor || Colors.dark);
    // }, []));

    const theme = useSelector((state: RootState) => state.theme);
    const styles = useMemo(() => styling(theme), [theme]);

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
}

const styling = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors[theme].white,
    }
});

export default PrimaryContainer;
