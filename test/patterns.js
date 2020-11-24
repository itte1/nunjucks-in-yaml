const fs = require('fs')

module.exports = [
  { no: 1, file: 'test/template-pattern-1.yml', text: fs.readFileSync('test/template-pattern-1.yml').toString(),
    loadOnly: { meta: { product: 'item' }, message: 'This product is  yen.' },
    useContext: { meta: { product: 'item' }, message: 'This product is 1000 yen.' },
    useIsExpand: { product: 'item', message: 'This product is 1000 yen.' }
  },
  { no: 2, file: 'test/template-pattern-2.yml', text: fs.readFileSync('test/template-pattern-2.yml').toString(),
     loadOnly: { meta: { product: 'item' }, message: 'This product is  yen.' },
     useContext: { meta: { product: 'item' }, message: 'This product is 1000 yen.' },
     useIsExpand: { product: 'item', message: 'This product is 1000 yen.' }
  },
  { no: 3, file: 'test/template-pattern-3.yml', text: fs.readFileSync('test/template-pattern-3.yml').toString(),
    loadOnly: { message: 'This product is  yen.' },
    useContext: { message: 'This product is 1000 yen.' },
    useIsExpand: { message: 'This product is 1000 yen.' }
  },
  { no: 4, file: 'test/template-pattern-4.yml', text: fs.readFileSync('test/template-pattern-4.yml').toString(),
    loadOnly: { meta: { product: 'item' } },
    useContext: { meta: { product: 'item' } },
    useIsExpand: { product: 'item' }
  },
  { no: 5, file: 'test/template-pattern-5.yml', text: fs.readFileSync('test/template-pattern-5.yml').toString(),
    loadOnly: { meta: { product: 'item' } },
    useContext: { meta: { product: 'item' } },
    useIsExpand: { product: 'item' }
  },
  { no: 6, file: 'test/template-pattern-6.yml', text: fs.readFileSync('test/template-pattern-6.yml').toString(),
    loadOnly: {},
    useContext: {},
    useIsExpand: {}
  }
]