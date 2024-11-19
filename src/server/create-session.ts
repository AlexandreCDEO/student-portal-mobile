import { api } from './api'

type CreateSessionsProps = {
  username: string
  password: string
}

type CreateSessionsResponse = {
  token: string | null
  registrations: string[]
  userIdToChangePassword: number | null
}

export async function createSession({
  username,
  password,
}: CreateSessionsProps) {
  const { data } = await api.post<CreateSessionsResponse>('/student-sessions', {
    username,
    password,
  })
  return data
}
