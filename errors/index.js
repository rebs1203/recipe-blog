const BadRequestError = require('./bad-request.js')
const NotFoundError = require('./not-found.js')
const UnauthenticatedError = require('./unauthenticated.js')
const CustomAPIError = require('./custom-api.js')

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    CustomAPIError
}