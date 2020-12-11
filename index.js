const fs = require('fs-extra')
const path = require('path')

const rootPath = 'C:\\Sources\\notes2.bootstrap'

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
      if (path.extname(file) === '.vue') {
        level.children.push({
          name: file,
          value: 99
        })
      }
    }
  })

  return level
}

const rootLevel = {name: 'root', children: []}

const result = getFiles(rootPath, rootLevel)

console.info(JSON.stringify(result))
