import React, { createContext, useReducer } from "react";


const initialState = {
    count: 0
}
let dummy: any = {}
let AppContext = createContext(dummy);

let reducer = (state: typeof initialState = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case "setCount": {
            return { ...state, count: action.payload }
        }
    }
    return state;
};

function AppContextProvider(props: any) {
    const fullInitialState = {
        ...initialState,
    }

    let [state, dispatch] = useReducer(reducer, fullInitialState);
    let value = { state, dispatch };


    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };