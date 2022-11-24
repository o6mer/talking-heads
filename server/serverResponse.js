class ServerResponse {
  constructor(message, statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = { ServerResponse };
