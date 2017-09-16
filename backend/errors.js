const StopProcessError = new Error('Already Send Out The Response');
const UnknownError = new Error('Unknown Error');

const errors = {
  StopProcessError,
  UnknownError
};

module.exports = errors;