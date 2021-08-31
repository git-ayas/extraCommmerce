import { Handler } from "@netlify/functions";

export default abstract class CurdController<ResourceType> {
    handler: Handler
    constructor(parameters) {
        this.handler = (event, context) => {
            switch (event.httpMethod) {
                case "GET":
                    this.get(event.queryStringParameters, event.body)
                    break;
                case "POST":
                    this.add(event.body)
                    break;
                case "PUT":
                    this.update(event.body)
                    break;
                case "DELETE":
                    this.delete(event.queryStringParameters, event.body)
                    break;
                default:
                    break;
            }

        }
    }

    abstract add(postBody): void | Promise<ResourceType>;
    abstract update(postBody): void | Promise<ResourceType>;
    abstract delete(getParameters, postBody?): void | Promise<ResourceType>;
    abstract get(getParameters, postBody?): ResourceType | Promise<ResourceType>;


}