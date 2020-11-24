const fs = require('fs')
const nunjucks = require('nunjucks')

const TemplateLoader = require('../lib')
const pattern = { no: 7, file: 'test/template-pattern-7.yml', text: fs.readFileSync('test/template-pattern-7.yml').toString(),
  loadOnly: { meta: { product: 'item' }, message: 'This product is  yen.' },
  useContext: { meta: { product: 'item' }, message: 'This product is 1,000 yen.' },
  useIsExpand: { product: 'item', message: 'This product is 1,000 yen.' }
}

const env = new nunjucks.Environment()
env.addFilter('locale', str => str ? str.toLocaleString() : str)

const templateLoader = new TemplateLoader(env)

test(`env pattern${pattern.no}`, () => {
  return templateLoader.render(pattern.file).then(data => expect(data).toStrictEqual(pattern.loadOnly))
})

test(`env pattern${pattern.no} use context`, () => {
  return templateLoader.render(pattern.file, { price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext))
})

test(`env pattern${pattern.no} use contexta and isExpand`, () => {
  return templateLoader.render(pattern.file, { price: 1000 }, true).then(data => expect(data).toStrictEqual(pattern.useIsExpand))
})

test(`env string pattern${pattern.no}`, () => {
  return templateLoader.renderString(pattern.text).then(data => expect(data).toStrictEqual(pattern.loadOnly))
})

test(`env string pattern${pattern.no} use context`, () => {
  return templateLoader.renderString(pattern.text, { price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext))
})

test(`env string pattern${pattern.no} use contexta and isExpand`, () => {
  return templateLoader.renderString(pattern.text, { price: 1000 }, true).then(data => expect(data).toStrictEqual(pattern.useIsExpand))
})

test(`env pattern${pattern.no} async`, () => {
  return templateLoader.compile(pattern.file).then(async template => {
    expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
    expect(template.product).toStrictEqual(pattern.loadOnly.product)
    if ('message' in pattern.loadOnly) {
      await template.message.render().then(data => expect(data).toStrictEqual(pattern.loadOnly.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})

test(`env pattern${pattern.no} use context async`, () => {
  return templateLoader.compile(pattern.file).then(async template => {
    expect(template.meta).toStrictEqual(pattern.useContext.meta)
    expect(template.product).toStrictEqual(pattern.useContext.product)
    if ('message' in pattern.useContext) {
      await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})

test(`env pattern${pattern.no} use contexta and isExpand async`, () => {
  return templateLoader.compile(pattern.file, true).then(async template => {
    expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
    expect(template.product).toStrictEqual(pattern.useIsExpand.product)
    if ('message' in pattern.useIsExpand) {
      await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useIsExpand.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})

test(`env string pattern${pattern.no} async`, () => {
  return templateLoader.compileString(pattern.text).then(async template => {
    expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
    expect(template.product).toStrictEqual(pattern.loadOnly.product)
    if ('message' in pattern.loadOnly) {
      await template.message.render().then(data => expect(data).toStrictEqual(pattern.loadOnly.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})

test(`env string pattern${pattern.no} use context async`, () => {
  return templateLoader.compileString(pattern.text).then(async template => {
    expect(template.meta).toStrictEqual(pattern.useContext.meta)
    expect(template.product).toStrictEqual(pattern.useContext.product)
    if ('message' in pattern.useContext) {
      await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useContext.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})

test(`env string pattern${pattern.no} use contexta and isExpand async`, () => {
  return templateLoader.compileString(pattern.text, true).then(async template => {
    expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
    expect(template.product).toStrictEqual(pattern.useIsExpand.product)
    if ('message' in pattern.useIsExpand) {
      await template.message.render({ price: 1000 }).then(data => expect(data).toStrictEqual(pattern.useIsExpand.message))
    } else {
      expect(template.message).toBeUndefined()
    }
  })
})
