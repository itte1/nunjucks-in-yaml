const path = require('path')
const TemplateLoader = require('../lib')

const filename = path.join(__dirname, 'email-template.yml')
const userList = [
  { name: 'a-san', email: 'a@a.email' },
  { name: 'b-san', email: 'b@b.email' },
  { name: 'c-san', email: 'c@c.email' },
]
const me = 'ME'

const template = TemplateLoader.compileSync(filename)

for (const user of userList) {
  const text = template.text.renderSync({user, me})
  const html = template.html.renderSync({user, me})
  const message = {
    to: user.email,
    text,
    html,
    ...template.meta
  }
  console.log(message) // In fact, message will be sent
}
