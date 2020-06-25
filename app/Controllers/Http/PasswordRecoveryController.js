'use strict'

const moment = require('moment')
const crypto = require('crypto')
const Mail = use('Mail')
const User = use('App/Models/User')

class PasswordRecoveryController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')

      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')

      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.password_recovery'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('wennlys@gmail.com', 'Wennlys Oliveira')
            .subject('Password Recovery')
        }
      )
    } catch (err) {
      return response.status(err.status).send({ error: { message: `ERROR: ${err.status}.` } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({ error: { message: 'Expired Token.' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ error: { message: `ERROR: ${err.status}.` } })
    }
  }
}

module.exports = PasswordRecoveryController
