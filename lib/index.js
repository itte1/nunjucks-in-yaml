const fs = require('fs')
const nunjucks = require('nunjucks')
const yaml = require('js-yaml')

const Template = class {
  constructor(template) {
    this.template = template
  }
  renderSync(context) {
    return this.template.render(context)
  }
  async render(context) {
    return this.renderSync(context)
  }
}

const TemplateLoader = class {
  constructor(env) {
    this.env = env
  }

  /* base algorithma */

  static applyStringSync(str, func = doc => doc, isExpand = false) {
    const docs = str.split(/\r?\n?(\-\-\-\s\s*#\s*[_\$a-zA-Z][_\$a-zA-Z0-9]*)\s*?\r?\n/)
    const separator = /^\-\-\-\s\s*#\s*([_\$a-zA-Z][_\$a-zA-Z0-9]*)$/
    function toYaml(docs) {
      if (isExpand) {
        return { ...yaml.safeLoad(docs[0]), ...distinguish(docs.slice(1)) }
      } else {
        const meta = yaml.safeLoad(docs[0])
        if (meta !== undefined) {
          return { meta, ...distinguish(docs.slice(1)) }
        } else {
          return distinguish(docs.slice(1))
        }
      }
    }
    function distinguish(docs) {
      if (docs.length > 0) {
        const matches = docs[0].match(separator)
        if (matches === null) {
          return toYaml(docs)
        } else {
          if (matches[1] === 'meta') {
            return toYaml(docs.slice(1))
          } else {
            return { [matches[1]]: func(docs[1]), ...distinguish(docs.slice(2)) }
          }
        }
      } else {
        return {}
      }
    }
    return distinguish(docs)
  }

  static renderStringSync(str, context = {}, isExpand = false) {
    return TemplateLoader.applyStringSync(str, doc => {
      return nunjucks.renderString(doc, context, isExpand)
    }, isExpand)
  }

  static compileStringSync(str, isExpand = false) {
    return TemplateLoader.applyStringSync(str, doc => {
      return new Template(nunjucks.compile(doc))
    }, isExpand)
  }

  renderStringSync(str, context = {}, isExpand = false) {
    return TemplateLoader.applyStringSync(str, doc => {
      return this.env.renderString(doc, context, isExpand)
    }, isExpand)
  }

  compileStringSync(str, isExpand = false) {
    return TemplateLoader.applyStringSync(str, doc => {
      return new Template(nunjucks.compile(doc, this.env))
    }, isExpand)
  }

  /* filename wrappers */

  static applySync(filename, func = doc => doc, isExpand = false) {
    const buffer = fs.readFileSync(filename)
    return TemplateLoader.applryStringSync(buffer.toString(), func, isExpand)
  }

  static renderSync(filename, context = {}, isExpand = false) {
    const buffer = fs.readFileSync(filename)
    return TemplateLoader.renderStringSync(buffer.toString(), context, isExpand)
  }

  static compileSync(filename, isExpand = false) {
    const buffer = fs.readFileSync(filename)
    return TemplateLoader.compileStringSync(buffer.toString(), isExpand)
  }

  renderSync(filename, context = {}, isExpand = false) {
    const buffer = fs.readFileSync(filename)
    return this.renderStringSync(buffer.toString(), context, isExpand)
  }

  compileSync(filename, isExpand = false) {
    const buffer = fs.readFileSync(filename)
    return this.compileStringSync(buffer.toString(), isExpand)
  }

  /* async wrappers */

  static async applyString(str, func = doc => doc, isExpand = false) {
    return TemplateLoader.applryStringSync(str, func, isExpand)
  }

  static async renderString(str, context = {}, isExpand = false) {
    return TemplateLoader.renderStringSync(str, context, isExpand)
  }

  static async compileString(str, isExpand = false) {
    return TemplateLoader.compileStringSync(str, isExpand)
  }

  async renderString(str, context = {}, isExpand = false) {
    return this.renderStringSync(str, context, isExpand)
  }

  async compileString(str, isExpand = false) {
    return this.compileStringSync(str, isExpand)
  }

  static async apply(filename, func = doc => doc, isExpand = false) {
    return TemplateLoader.applrySync(filename, func, isExpand)
  }

  static async render(filename, context = {}, isExpand = false) {
    return TemplateLoader.renderSync(filename, context, isExpand)
  }

  static async compile(filename, isExpand = false) {
    return TemplateLoader.compileSync(filename, isExpand)
  }

  async render(filename, context = {}, isExpand = false) {
    return this.renderSync(filename, context, isExpand)
  }

  async compile(filename, isExpand = false) {
    return this.compileSync(filename, isExpand)
  }

}

module.exports = TemplateLoader