import React, { createContext, useReducer } from "react";


interface StateType {

}
let initialState = {}
interface ActionType { type: string, payload: any }
const StoreContext = createContext({} as StateType)
const reducer = (state: StateType, action: ActionType) => {

    switch (action.type) {
        case "":
            
            break;
    
        default:
            break;
    }
    return state

}

const StoreProvider:React.FC = (props) =>{
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <StoreContext.Provider value ={{state,dispatch}}>{props.children}</StoreContext.Provider>
    )
}

const StoreConsumer = StoreContext.Consumer
export {StoreContext,StoreProvider,StoreConsumer }

