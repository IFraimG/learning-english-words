export interface profileAuth {
  email: string
  login: string
  id: string
}

export interface loginAuthIT {
  email: string
  password: string
  login: string
}

export default interface AuthInterface {
  profile: profileAuth
  isAuth: boolean
  errors: string[]
}