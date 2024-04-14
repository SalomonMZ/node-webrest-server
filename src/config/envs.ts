import 'dotenv/config'
import {get} from 'env-var'

export const envs = {

    //* Port on where the server is going to be served
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString()
}