let unexpectedErrorHandler = (res, msg='An unexpected error has occured.') => {
  res.status(500).send(msg)
}

let invalidInputHandler = (res, msg='You have entered an invalid input.') => {
  res.status(400).send(msg)
}

module.exports = {
  unexpectedErrorHandler: unexpectedErrorHandler,
  invalidInputHandler: invalidInputHandler
}
