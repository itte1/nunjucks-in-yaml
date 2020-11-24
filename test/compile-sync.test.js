const patterns = require('./patterns')
const TemplateLoader = require('../lib')

for (const pattern of patterns) {
  test(`compile pattern${pattern.no}`, () => {
    const template = TemplateLoader.compileSync(pattern.file)
    expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
    expect(template.product).toStrictEqual(pattern.loadOnly.product)
    if ('message' in pattern.loadOnly) {
      expect(template.message.renderSync()).toStrictEqual(pattern.loadOnly.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}

for (const pattern of patterns) {
  test(`compile pattern${pattern.no} use context`, () => {
    const template = TemplateLoader.compileSync(pattern.file)
    expect(template.meta).toStrictEqual(pattern.useContext.meta)
    expect(template.product).toStrictEqual(pattern.useContext.product)
    if ('message' in pattern.useContext) {
      expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useContext.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}

for (const pattern of patterns) {
  test(`compile pattern${pattern.no} use contexta and isExpand`, () => {
    const template = TemplateLoader.compileSync(pattern.file, true)
    expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
    expect(template.product).toStrictEqual(pattern.useIsExpand.product)
    if ('message' in pattern.useIsExpand) {
      expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useIsExpand.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no}`, () => {
    const template = TemplateLoader.compileStringSync(pattern.text)
    expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
    expect(template.product).toStrictEqual(pattern.loadOnly.product)
    if ('message' in pattern.loadOnly) {
      expect(template.message.renderSync()).toStrictEqual(pattern.loadOnly.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no} use context`, () => {
    const template = TemplateLoader.compileStringSync(pattern.text)
    expect(template.meta).toStrictEqual(pattern.useContext.meta)
    expect(template.product).toStrictEqual(pattern.useContext.product)
    if ('message' in pattern.useContext) {
      expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useContext.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no} use contexta and isExpand`, () => {
    const template = TemplateLoader.compileStringSync(pattern.text, true)
    expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
    expect(template.product).toStrictEqual(pattern.useIsExpand.product)
    if ('message' in pattern.useIsExpand) {
      expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useIsExpand.message)
    } else {
      expect(template.message).toBeUndefined()
    }
  })
}