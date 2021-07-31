export type IError = {
  status: number
  message: string
}

export class Error implements IError {
  message: string
  status: number

  constructor(message: string, status: number) {
    this.message = message
    this.status = status
  }
}
