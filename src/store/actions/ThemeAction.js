export const setModeRedux = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}

export const setColorRedux = color => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

export const getThemeRedux = () => {
    return {
        type: 'GET_THEME'
    }
}


