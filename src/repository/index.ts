import { Model } from 'mongoose'
import { Error } from '../utils/types'
export default class Repository<T> {
  private _model: Model<T>

  constructor(model: Model<T>) {
    this._model = model
  }

  async list(): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      this._model.find({}).then((data) => {
        resolve(data)
      })
    })
  }

  async find(_id: String) {
    return new Promise((resolve, reject) => {
      this._model
        .findById(_id)
        .then((data) => {
          data
            ? resolve(data)
            : reject({ message: `${this._model.modelName} not found` })
        })
        .catch((error) => reject(error))
    })
  }

  async create(item: T) {
    return new Promise((resolve, reject) => {
      this._model
        .create(item)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  async update(_id, item: T) {
    return new Promise((resolve, reject) => {
      this._model
        .findOneAndUpdate({ _id }, item, { new: true })
        .then((data) => {
          data
            ? resolve(data)
            : reject({ message: `${this._model.modelName} not found` })
        })
        .catch((error) => reject(error))
    })
  }

  async delete(_id) {
    return new Promise((resolve, reject) => {
      this._model
        .findOneAndDelete({ _id })
        .then((data) => {
          data
            ? resolve({
                message: `${this._model.modelName} deleted sucessfully`
              })
            : reject({ message: `${this._model.modelName} not found` })
        })
        .catch((error) => reject(error))
    })
  }
}
