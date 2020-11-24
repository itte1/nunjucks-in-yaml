# nunjucks-in-yaml

A YAML extension to use documents in YAML as Nunjucks templates.

## Install

```shell
npm i nunjucks-in-yaml
```

## Template example

A template files are `--- # {name}`-separated YAML and nunjucks templates.
First section is YAML. Nunjucks templates follows it.

```yaml
from: from@me.email
subject: Thank you for your message!

--- # text

Hi {{ user.name }},

Thank you for your message.

Best regards,

--- # html

Hi <b>{{ user.name }}<b>,

Thank you for your message.

Best regards,

```

## Usage

```js
const loader = require('nunjucks-in-yaml')

const user = {
  name: 'Kurara',
  email: 'kurara@xx.email'
}
const obj = loader.renderSync('test.yml', { user })

console.log(obj)

/* Output:
{
  meta: { from: 'from@me.email', subject: 'Thank you for your message!' },
  text: '\r\nHi Kurara,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n',
  html: '\r\nHi <b>Kurara<b>,\r\n\r\nThank you for your message.\r\n\r\nBest regards,\r\n'
}
 */
```

## Examples

[View here](https://github.com/ittedev/nunjucks-in-yaml/tree/main/examples)
