import React, { createContext, useReducer } from "react";
import storeModel from "../models/storeModel";

interface StateType {
    fetchedProducts: any
}
let initialState: StateType = { fetchedProducts: {} }
interface ActionType { type: string, payload: any }
let dummy: any = {}
let StoreContext = createContext(dummy)
const StoreDataController = new storeModel();
const mutator = (state: StateType, action: ActionType) => {

    switch (action.type) {
        case "updateFetchedProducts":
            state.fetchedProducts = action.payload
            break;

        default:
            break;
    }
    return state

}

function StoreProvider(props: any) {
    const [state, dispatch] = useReducer(mutator, initialState)

    const action = (name: any, payload: any) => {
        switch (name) {
            case "GET":
                StoreDataController.getProducts().then((res) => {
                    dispatch({ type: "updateFetchedProducts", payload: res.data })
                })

                break;

            default:
                break;
        }
    }
    const value = { state, action }
    return (
        <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>
    )
}

const StoreConsumer = StoreContext.Consumer
export { StoreContext, StoreProvider, StoreConsumer }

