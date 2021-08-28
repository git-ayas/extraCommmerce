import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ environment: process.env, event, context }),
    };

};

export { handler };