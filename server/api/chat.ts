import {invokeBackend} from "../utils/backend";

export default defineEventHandler(async (event) => {
    const {input, token} = await readBody(event)
    if (!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token not provided.',
        })
    }
    const res = await verifyTurnstileToken(token)
    if (!res.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token not valid.',
        })
    }
    return await invokeBackend(event, 'chat', {text: input});
});
