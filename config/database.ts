import mongoose from 'mongoose'

export const initDb = (connectionUrl: any) => {
  mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((r) => console.log('💾 MongoDB | Connected'))

  let db = mongoose.connection

  db.on('error', console.error.bind(console, 'MongoDB | Error:'))
}
