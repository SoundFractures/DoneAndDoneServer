export type MakeJSON = {
  message: string
}

export const makeJSON = (message: string): MakeJSON => {
  return {
    message
  }
}
