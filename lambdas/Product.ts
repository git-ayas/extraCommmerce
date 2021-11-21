import { Handler } from "@netlify/functions";
import { ObjectId } from "mongodb";
import dbPromise from "./DbConnection";

const handler: Handler = async (event, context) => {
    try {
        const db = await dbPromise
        let data: any;
        console.log(event)
        const { httpMethod, multiValueQueryStringParameters, queryStringParameters, body: postBody } = event

        switch (httpMethod) {
            case "GET":
                data = await db.collection("products").find().toArray()
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                };
            case "POST":
                console.log("Event", event)
                data = await db.collection("products").insertOne(JSON.parse(postBody))
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
                data = await db.collection("products").findOneAndDelete({ _id: new ObjectId(queryStringParameters._id) },
                    {
                        sort: { "price": 1 }
                    })
                if (data.value === null) {
                    throw new Error("Failed to delete product. No product found.");
                }
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data.value),
                };

            default:
                break;
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: 500, message: error.message }),
        };

    }
};

export { handler };