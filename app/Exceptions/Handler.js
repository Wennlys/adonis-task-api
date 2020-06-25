'use strict'

const Sentry = require('@sentry/node')
const Config = use('Config')
const Env = use('Env')
const BaseExceptionHandler = use('BaseExceptionHandler')
const Youch = use('youch')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'validationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report () {
    Sentry.init({ dsn: 'https://36ad08f68d9c4eb9a1e5e695c8cb0ac4@o403041.ingest.sentry.io/5289421' })
    Sentry.captureException(new Error('Good bye'))
  }
}

module.exports = ExceptionHandler
