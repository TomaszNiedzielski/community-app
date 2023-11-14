import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ScalableImage from '../../common/ScalableImage';
import Colors from '../../../constants/Colors';

const renderShadow = () => {
    const views = [];

    for (let i = 0; i <= 1; i+=.03) {
        let opacity = i;

        views.push(
            <View
                key={i}
                style={{ height: 1, backgroundColor: Colors.white, opacity }}
            />
        );
    }

    return views;
}

interface Props {
    uri: string;
    collapsed?: boolean;
}

const PostImage: React.FC<Props> = ({ uri, collapsed }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (collapsed !== undefined) {
            setIsCollapsed(collapsed);
        }
    }, [collapsed]);

    return (
        <View style={[styles.container, isCollapsed ? styles.collapsed : {}]}>
            <ScalableImage
                uri={uri}
                onSizeCalculated={({ height }) => (collapsed === true) && setIsCollapsed(height > 350)}
            />
            {isCollapsed && <TouchableWithoutFeedback
                onPress={() => setIsCollapsed(false)}
            >
                <View style={styles.touchable}>
                    <View style={styles.shadowBottom}>{renderShadow()}</View>
                </View>
            </TouchableWithoutFeedback>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    collapsed: {
        height: 350,
        overflow: 'hidden',
    },
    shadowBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    touchable: {
        position: 'absolute',
        height: 350,
        width: '100%',
    }
});

export default PostImage;
