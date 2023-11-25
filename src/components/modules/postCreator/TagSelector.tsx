import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const tags = ['#anxiety', '#depression', '#loneliness', '#addictions', '#relationships', '#bullying'];

interface TagProps {
    name: string;
    onPress: () => void;
    isSelected: boolean;
}

const Tag: React.FC<TagProps> = ({ name, onPress, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.tag, (isSelected ? styles.selectedTag : {})]}>{name}</Text>
        </TouchableOpacity>
    );
}

interface Props {
    onChange: (tags: string[]) => void;
    selectedTags: string[];
}

const TagSelector: React.FC<Props> = ({ onChange, selectedTags }) => {
    const onPressTag = (tag: string) => {
        let updatedSelectedTags = [...selectedTags];

        if (selectedTags.includes(tag)) {
            updatedSelectedTags = updatedSelectedTags.filter(item => item !== tag);
        } else {
            updatedSelectedTags.push(tag);
        }

        onChange(updatedSelectedTags);
    }

    return (
        <View style={styles.container}>
            {tags.map(tag => <Tag
                name={tag}
                onPress={() => onPressTag(tag)}
                isSelected={selectedTags.includes(tag)}
            />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    tag: {
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.gray,
        color: Colors.gray,
        margin: 5,
        borderRadius: 10,
        fontSize: 13,
    },
    selectedTag: {
        borderColor: Colors.gold,
        color: Colors.gold
    }
});

export default TagSelector;
