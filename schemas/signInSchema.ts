import * as zod from "zod"


export const signInSchema = zod.object({
    identifier : zod.string().min(1,{message: "Email is required"}).email({message: "Invalid email address"}),
    password: zod.string().min(8,{message: "Password must be at least 8 characters long"}),
});