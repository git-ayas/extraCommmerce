import React, { createContext, useReducer } from "react";
import storeModel from "../models/storeModel";

interface StateType {
    status: "idle" | "fetching",
    fetchedProducts: any,
}
let initialState: StateType = { status: "idle", fetchedProducts: {} }
interface ActionType { type: string, payload: any }
let dummy: any = {}
let StoreContext = createContext(dummy)
const StoreDataController = new storeModel();
const mutator = (state: StateType, action: ActionType) => {
    let immutableState = state

    switch (action.type) {
        case "updateFetchedProducts":
            immutableState.fetchedProducts = action.payload
            break;
        case "statusUpdate":
            immutableState.status = action.payload
            break

        default:
            break;
    }
    return { ...state, ...immutableState }

}

function StoreProvider(props: any) {
    const [state, dispatch] = useReducer(mutator, initialState)

    const action = (name: any, payload: any = null) => {
        switch (name) {
            case "GET":
                dispatch({
                    type: "statusUpdate", payload: "fetching"
                })
                StoreDataController.getProducts().then((res) => {
                    console.log("checking state", state)
                    dispatch({ type: "updateFetchedProducts", payload: res.data })
                    dispatch({
                        type: "statusUpdate", payload: "idle"
                    })
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

