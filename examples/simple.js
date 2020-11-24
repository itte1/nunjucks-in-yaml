const path = require('path')
const TemplateLoader = require('../lib')

const filename = path.join(__dirname, 'email-template.yml')
const user = { name: 'a-san', email: 'a@a.email' }

const message = TemplateLoader.renderSync(filename, { user }, true)
console.log(message) // In fact, message will be sent

/* Output:
{
  from: 'from@me.email',
  subject: 'Thank you for your message!',
  text: '\r\nHi a-san,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',     
  html: '\r\nHi <b>a-san<b>,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n'
}
 */
