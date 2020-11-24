const patterns = require('./patterns')
const TemplateLoader = require('../lib')

for (const pattern of patterns) {
  test(`render pattern${pattern.no}`, () => {
    expect(TemplateLoader.renderSync(pattern.file)).toStrictEqual(pattern.loadOnly)
  })
}

for (const pattern of patterns) {
  test(`render pattern${pattern.no} use context`, () => {
    expect(TemplateLoader.renderSync(pattern.file, { price: 1000 })).toStrictEqual(pattern.useContext)
  })
}

for (const pattern of patterns) {
  test(`render pattern${pattern.no} use contexta and isExpand`, () => {
    expect(TemplateLoader.renderSync(pattern.file, { price: 1000 }, true)).toStrictEqual(pattern.useIsExpand)
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no}`, () => {
    expect(TemplateLoader.renderStringSync(pattern.text)).toStrictEqual(pattern.loadOnly)
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no} use context`, () => {
    expect(TemplateLoader.renderStringSync(pattern.text, { price: 1000 })).toStrictEqual(pattern.useContext)
  })
}

for (const pattern of patterns) {
  test(`render string pattern${pattern.no} use contexta and isExpand`, () => {
    expect(TemplateLoader.renderStringSync(pattern.text, { price: 1000 }, true)).toStrictEqual(pattern.useIsExpand)
  })
}