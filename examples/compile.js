const path = require('path')
const TemplateLoader = require('../lib')

const filename = path.join(__dirname, 'email-template.yml')
const userList = [
  { name: 'a-san', email: 'a@a.email' },
  { name: 'b-san', email: 'b@b.email' },
  { name: 'c-san', email: 'c@c.email' },
]

const template = TemplateLoader.compileSync(filename)

for (const user of userList) {
  const text = template.text.renderSync({ user })
  const html = template.html.renderSync({ user })
  const message = {
    to: user.email,
    text,
    html,
    ...template.meta
  }
  console.log(message) // In fact, message will be sent
}

/* Output:
{
  to: 'a@a.email',
  text: '\r\nHi a-san,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  html: '\r\nHi <b>a-san<b>,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  from: 'from@me.email',
  subject: 'Thank you for your message!'
}
{
  to: 'b@b.email',
  text: '\r\nHi b-san,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  html: '\r\nHi <b>b-san<b>,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  from: 'from@me.email',
  subject: 'Thank you for your message!'
}
{
  to: 'c@c.email',
  text: '\r\nHi c-san,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  html: '\r\nHi <b>c-san<b>,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  from: 'from@me.email',
  subject: 'Thank you for your message!'
}
 */