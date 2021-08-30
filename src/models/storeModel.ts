import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export default class storeModel {
    connection: AxiosInstance;
    constructor() {
        const { origin } = window.location
        this.connection = axios.create({
            baseURL: `${origin}/.netlify/functions/`,
            timeout: 10000,
        });


    }
    getProducts() {

        return this.connection.get("Product")

    }
    addProduct(productDetails: any) {
        return this.connection.post("Product", productDetails)
    }
}