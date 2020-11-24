const path = require('path')
const TemplateLoader = require('../lib')

const filename = path.join(__dirname, 'email-template.yml')
const user = { name: 'a-san', email: 'a@a.email' }
const me = 'ME'

const message = TemplateLoader.renderSync(filename, {user, me}, true)
console.log(message) // In fact, message will be sent
