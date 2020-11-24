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
  expect(templateLoader.renderSync(pattern.file)).toStrictEqual(pattern.loadOnly)
})

test(`env pattern${pattern.no} use context`, () => {
  expect(templateLoader.renderSync(pattern.file, { price: 1000 })).toStrictEqual(pattern.useContext)
})

test(`env pattern${pattern.no} use contexta and isExpand`, () => {
  expect(templateLoader.renderSync(pattern.file, { price: 1000 }, true)).toStrictEqual(pattern.useIsExpand)
})

test(`env string pattern${pattern.no}`, () => {
  expect(templateLoader.renderStringSync(pattern.text)).toStrictEqual(pattern.loadOnly)
})

test(`env string pattern${pattern.no} use context`, () => {
  expect(templateLoader.renderStringSync(pattern.text, { price: 1000 })).toStrictEqual(pattern.useContext)
})

test(`env string pattern${pattern.no} use contexta and isExpand`, () => {
  expect(templateLoader.renderStringSync(pattern.text, { price: 1000 }, true)).toStrictEqual(pattern.useIsExpand)
})

test(`env pattern${pattern.no}`, () => {
  const template = templateLoader.compileSync(pattern.file)
  expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
  expect(template.product).toStrictEqual(pattern.loadOnly.product)
  if ('message' in pattern.loadOnly) {
    expect(template.message.renderSync()).toStrictEqual(pattern.loadOnly.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})

test(`env pattern${pattern.no} use context`, () => {
  const template = templateLoader.compileSync(pattern.file)
  expect(template.meta).toStrictEqual(pattern.useContext.meta)
  expect(template.product).toStrictEqual(pattern.useContext.product)
  if ('message' in pattern.useContext) {
    expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useContext.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})

test(`env pattern${pattern.no} use contexta and isExpand`, () => {
  const template = templateLoader.compileSync(pattern.file, true)
  expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
  expect(template.product).toStrictEqual(pattern.useIsExpand.product)
  if ('message' in pattern.useIsExpand) {
    expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useIsExpand.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})

test(`env string pattern${pattern.no}`, () => {
  const template = templateLoader.compileStringSync(pattern.text)
  expect(template.meta).toStrictEqual(pattern.loadOnly.meta)
  expect(template.product).toStrictEqual(pattern.loadOnly.product)
  if ('message' in pattern.loadOnly) {
    expect(template.message.renderSync()).toStrictEqual(pattern.loadOnly.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})

test(`compile string pattern${pattern.no} use context`, () => {
  const template = templateLoader.compileStringSync(pattern.text)
  expect(template.meta).toStrictEqual(pattern.useContext.meta)
  expect(template.product).toStrictEqual(pattern.useContext.product)
  if ('message' in pattern.useContext) {
    expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useContext.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})

test(`compile string pattern${pattern.no} use contexta and isExpand`, () => {
  const template = templateLoader.compileStringSync(pattern.text, true)
  expect(template.meta).toStrictEqual(pattern.useIsExpand.meta)
  expect(template.product).toStrictEqual(pattern.useIsExpand.product)
  if ('message' in pattern.useIsExpand) {
    expect(template.message.renderSync({ price: 1000 })).toStrictEqual(pattern.useIsExpand.message)
  } else {
    expect(template.message).toBeUndefined()
  }
})