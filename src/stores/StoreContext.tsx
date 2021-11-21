import { useIonAlert } from "@ionic/react";
import React, { createContext, PropsWithChildren, useReducer } from "react";
import storeModel, { ProductData } from "../models/storeModel";

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

function StoreProvider(props: PropsWithChildren<any>) {
    const [state, dispatch] = useReducer(mutator, initialState)
    const [present] = useIonAlert()
    const success = (header: string, message: string) => {
        present({
            cssClass: "success-message-alert",
            header,
            message,
            buttons: [
                "Dismiss"
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }
    const info = (header: string, message: string) => {
        present({
            cssClass: "info-message-alert",
            header,
            message,
            buttons: [
                "Dismiss"
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }
    const fail = (header: string, message: string) => {

        present({
            cssClass: "fail-message-alert",
            header,
            message,
            buttons: [
                "Dismiss"
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }


    const action = (name: any, payload: null | ProductData = null) => {
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

            case "addProduct":
                if (payload == null) {
                    throw new Error("Empty product data");
                }
                StoreDataController.addProduct(payload)
                    .then(() => success("Added", "New product added."))
                    .catch((error) => { fail("Failed to add product", error.message) })
                break
            case "deleteProduct":
                if (payload === null || payload === undefined) {
                    throw new Error("Empty product data");
                }
                StoreDataController.deleteProduct(payload).then(()=>action("GET"))
                break

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

