import mongoose, { CallbackError } from 'mongoose'

class Repository<T extends mongoose.Document> {
  private _model: mongoose.Model<mongoose.Document>

  constructor(model: mongoose.Model<mongoose.Document> | any) {
    this._model = model
  }

  index(callback: (error: any, result: mongoose.Document[]) => void) {
    this._model.find({}, callback)
  }

  find(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, (error: any, result: T) => {
      if (!result) callback(true, result)
      callback(error, result)
    })
  }

  create(item: T, callback: (error: any, result: any) => void) {
    this._model.create(item, callback)
  }

  update(
    _id: mongoose.Types.ObjectId,
    item: T,
    callback: (error: any, result: any) => void
  ) {
    this._model.findOneAndUpdate({ _id }, item, { new: true }, callback)
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.deleteOne({ _id }, (err) => callback(err, null))
  }
}

export = Repository
