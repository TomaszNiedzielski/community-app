import { TextInput, StyleSheet, TextInputProps, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

interface Props extends TextInputProps {
    errorMessage?: string;
    label?: string;
    inputStyle?: TextInputProps['style'];
}

const FormInput: React.FC<Props> = (props) => {
    return (
        <View style={props.style}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <TextInput
                {...props}
                style={[styles.input, props.inputStyle]}
                placeholderTextColor="#32325e"
            />
            {props.errorMessage && <Text style={styles.error}>{props.errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: Colors.gray,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#33335E',
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 12,
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginTop: 4,
        marginLeft: 4,
    }
});

export default FormInput;
