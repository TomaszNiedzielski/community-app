import React, { useEffect, useState } from 'react';
import { Image, Dimensions, ImageStyle, ImageSourcePropType } from 'react-native';
import { SCREEN_PADDING } from '../common/PrimaryContainer';

interface Props {
    uri: string | ImageSourcePropType;
    style?: ImageStyle;
}

const ScalableImage: React.FC<Props> = ({ uri, style }) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const screenWidth = Dimensions.get('screen').width;
        const imageWidth = screenWidth - SCREEN_PADDING * 2;
        setWidth(imageWidth);
        
        if (typeof uri === 'string') {
            Image.getSize(uri, (width, height) => {
                setHeight(height * imageWidth / width);
            });
        } else {
            const assetDimensions = Image.resolveAssetSource(uri);
            setHeight(assetDimensions.height * imageWidth / assetDimensions.width);
        }
    }, [uri]);

    return (
        <Image
            source={typeof uri === 'string' ? { uri } : uri}
            style={[{ height, width }, style]}
        />
    );
}

export default ScalableImage;
