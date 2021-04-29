export interface profileAuth {
    email: string
    login: string
    id: string
}

export default interface AuthInterface {
    profile: profileAuth
    isAuth: boolean
    errors: string[]
}