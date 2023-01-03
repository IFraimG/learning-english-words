export interface UsersIT {
  users: Array<UserType>
  length: number
  position: number
}

export interface UserType {
  id: string
  login: string
  folders: number
  words: number
  title: string
}