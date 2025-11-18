import { env } from "@/config/env"
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: env.API_BASE_URL,
    plugins: [adminClient({
    })]
})