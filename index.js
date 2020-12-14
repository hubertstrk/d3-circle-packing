const fs = require('fs-extra')
const path = require('path')

const rootPath = 'C:\\Sources\\WebAppV2\\Solutions\\WebApp\\wwwroot\\src\\vue\\areas\\field-record-system'

const getFiles = function(dir, level) {

  fs.readdirSync(dir).forEach(function(file) {

    if (file === 'node_modules' || file === '.git') return
    var stat = fs.statSync(dir + '\\' + file)

    if (stat && stat.isDirectory()) {
      const child = {
        name: file,
        children: []
      }
      level.children.push(child)
      getFiles(dir + '\\' + file, child)
    } else {
      if (path.extname(file) === '.vue' || path.extname(file) === '.js') {
        level.children.push({
          name: file,
          value: stat.size
        })
      }
    }
  })

  return level
}

const rootLevel = {name: 'root', children: []}

const result = getFiles(rootPath, rootLevel)

fs.writeFileSync('out.json', JSON.stringify(result))
