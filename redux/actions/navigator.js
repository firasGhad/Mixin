import {SAVE_SCREEN} from './types';

export const saveScreen = (screen) => {
    return {
    type: SAVE_SCREEN,
    screen
};
}

