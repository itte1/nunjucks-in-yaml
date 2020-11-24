const patterns = require('./patterns')
const TemplateLoader = require('../lib')

for (const pattern of patterns) {
  test(`render pattern${pattern.no}`, () => {
    return TemplateLoader.render(pattern.file).then(data => expect(data).toStrictEqual(pattern.loadOnly))
  })
}

for (const pattern of patterns) {
  test(`render pattern${pattern.no} use context`, () => {
    return TemplateLoader.render(pattern.file, { price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext))
  })
}

for (const pattern of patterns) {
  test(`render pattern${pattern.no} use contexta and isExpand`, () => {
    return TemplateLoader.render(pattern.file, { price: 1000 }, true).then(data => expect(data).toStrictEqual(pattern.useIsExpand))
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no}`, () => {
    return TemplateLoader.renderString(pattern.text).then(data => expect(data).toStrictEqual(pattern.loadOnly))
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no} use context`, () => {
    return TemplateLoader.renderString(pattern.text, { price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext))
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no} use contexta and isExpand`, () => {
    return TemplateLoader.renderString(pattern.text, { price: 1000 }, true).then(data => expect(data).toStrictEqual(pattern.useIsExpand))
  })
}