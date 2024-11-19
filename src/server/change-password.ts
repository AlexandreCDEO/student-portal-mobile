import { api } from './api'

type ChangePasswordProps = {
  id: number
  password: string
  newPassword: string
  confirmPassword: string
}

type ChangePasswordResponse = {
  message: string
}

export async function changePassword({
  id,
  password,
  newPassword,
  confirmPassword,
}: ChangePasswordProps) {
  const { data } = await api.post<ChangePasswordResponse>('change-password', {
    id,
    password,
    newPassword,
    confirmPassword,
  })

  return data
}
