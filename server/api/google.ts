import axios, { AxiosResponse } from "axios"
import {z} from "zod"

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI

const url = "https://oauth2.googleapis.com/token"

const Response = z.object({
    id_token: z.string(),
    access_token: z.string(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.literal("Bearer"),
    // refresh_token: z.string()
})

type Response = z.infer <typeof Response>

export const getIdToken = async (code: string): Promise<string | null> => {
    try {
        const response : AxiosResponse = await axios.post(url, {
            code: code,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code"
        })
        const result = Response.safeParse(response.data)

        if (result.success === false){
            console.log(result.error)
            return null
        }
        
        return result.data.id_token
    } catch (error) {
        console.log(error) 
        return null
    }
}