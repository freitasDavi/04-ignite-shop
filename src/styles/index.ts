import { createStitches } from "@stitches/react";

export const { 
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
} = createStitches({
    theme: {
        colors: {
            white: '#fff',

            gray900: '#121214',
            gray800: '#202024',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',

            green500: '#00875F',
            green300: '#00B37E'
        }
    }
});