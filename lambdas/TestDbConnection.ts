import { Handler } from "@netlify/functions";
import dbPromise from "./DbConnection";

const handler: Handler = async (event, context) => {
    try {
        const db = await dbPromise

        const data = await db.collection("index").find().toArray()
        console.log(event,data)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(error.message),
        };

    }
};

export { handler };