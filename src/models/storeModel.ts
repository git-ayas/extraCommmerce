import axios, { AxiosInstance } from "axios";


export interface ProductData {
    name: string;
    price: number;
    description: string;
}
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
    addProduct(productDetails: ProductData) {
        return this.connection.post("Product", productDetails)
    }
    deleteProduct(productDetails: ProductData) {
        return this.connection.delete("Product", {
            params: productDetails
        })
    }
}