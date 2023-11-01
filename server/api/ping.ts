import {invokeBackend} from "../utils/backend";

export default defineEventHandler(async (event) => {
    return {
        backend: {
            ping: await invokeBackend(event, "ping", {}),
        },
    };
});
