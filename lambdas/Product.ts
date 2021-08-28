import { Handler } from "@netlify/functions";
import dbPromise from "./DbConnection";

const handler: Handler = async (event, context) => {
    try {
        const db = await dbPromise
        let data: any;

        console.log(event)
        switch (event.httpMethod) {
            case "GET":
                data = await db.collection("products").find().toArray()
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                };
            case "POST":
                console.log("Event",event)
                data = await db.collection("products").insertOne(JSON.parse(event.body))
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                };
            case "PUT":
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(event),
                };
            case "DELETE":
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(event),
                };
        
            default:
                break;
        }
        
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(error.message),
        };

    }
};

export { handler };