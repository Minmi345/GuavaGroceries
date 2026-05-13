export const verificate = {}

verificate.id = (req, res, next) => {
  const id = Number(req.params.id)
  if (isNaN(id) || id < 0 || !Number.isInteger(id)) {
    // console.log(req.params.id)
    // console.log(id)
    // console.log(typeof(id))
    // console.log(!isNaN(id))
    // console.log(id > 0)
    console.log(!Number.isInteger(id))
    return res.status(400).json({ message: "Bad request: id is not valid" })
  }
  next()
}

verificate.name = (req, res, next) => {
  const name = String(req.body)
  
}

verificate.password = (req, res, next) => {

}