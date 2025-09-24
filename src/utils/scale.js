import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base screen size you designed for (e.g., iPhone 13)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scale based on width
export const scale = (size) => (width / BASE_WIDTH) * size;

// Scale based on height
export const verticalScale = (size) => (height / BASE_HEIGHT) * size;

// Moderate scale for fonts / spacing (blend of width & height)
export const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;
