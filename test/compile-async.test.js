const patterns = require('./patterns')
const TemplateLoader = require('../lib')

for (const pattern of patterns) {
  test(`compile pattern${pattern.no} async`, () => {
    return TemplateLoader.compile(pattern.file).then(async template => {
      expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
      expect(template.product).toStrictEqual(pattern.loadOnly.product)
      if ('message' in pattern.loadOnly) {
        await template.message.render().then(data => expect(data).toStrictEqual(pattern.loadOnly.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}

for (const pattern of patterns) {
  test(`compile pattern${pattern.no} use context async`, () => {
    return TemplateLoader.compile(pattern.file).then(async template => {
      expect(template.meta).toStrictEqual(pattern.useContext.meta)
      expect(template.product).toStrictEqual(pattern.useContext.product)
      if ('message' in pattern.useContext) {
        await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}

for (const pattern of patterns) {
  test(`compile pattern${pattern.no} use contexta and isExpand async`, () => {
    return TemplateLoader.compile(pattern.file, true).then(async template => {
      expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
      expect(template.product).toStrictEqual(pattern.useIsExpand.product)
      if ('message' in pattern.useIsExpand) {
        await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useIsExpand.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no} async`, () => {
    return TemplateLoader.compileString(pattern.text).then(async template => {
      expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
      expect(template.product).toStrictEqual(pattern.loadOnly.product)
      if ('message' in pattern.loadOnly) {
        await template.message.render().then(data => expect(data).toStrictEqual(pattern.loadOnly.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no} use context async`, () => {
    return TemplateLoader.compileString(pattern.text).then(async template => {
      expect(template.meta).toStrictEqual(pattern.useContext.meta)
      expect(template.product).toStrictEqual(pattern.useContext.product)
      if ('message' in pattern.useContext) {
        await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}

for (const pattern of patterns) {
  test(`compile string pattern${pattern.no} use contexta and isExpand async`, () => {
    return TemplateLoader.compileString(pattern.text, true).then(async template => {
      expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
      expect(template.product).toStrictEqual(pattern.useIsExpand.product)
      if ('message' in pattern.useIsExpand) {
        await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useIsExpand.message))
      } else {
        expect(template.message).toBeUndefined()
      }
    })
  })
}