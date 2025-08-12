import * as z from "zod"

export const signUpSchema = z.object({
    email: z.string().min(1,{message: "Email is required"}).email({message: "Invalid email address"}),
    password: z.string().min(8,{message: "Password must be at least 8 characters long"}),
    passwordConfirmation: z.string().min(8,{message: "Confirm Password must be at least 8 characters long"}),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});