import { object, string, TypeOf } from "zod";

export const registerSchema = object({
    login: string(),
    password: string().refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/.test(password), "Пароль слишком простой")
})
export const registerReqSchema = object({
    body: registerSchema
})
export type RegisterType = TypeOf<typeof registerSchema>


export const authorizeSchema = object({
    login: string(),
    password: string()
})
export const authorizeReqSchema = object({
    body: authorizeSchema
})
export type AuthorizeType = TypeOf<typeof authorizeSchema>