const commonColors = {
    primary: '',
    accent: '',
    // dark: '',
    // gray: '',
}

const light = {
    ...commonColors,
    white: '#fff',
    black: '#000'
}

const dark = {
    ...commonColors,
    white: '#000',
    black: '#fff'
}

export type Theme = 'light' | 'dark';

export default { light, dark }
