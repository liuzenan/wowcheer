/*
Plug-ins for mongoose schema
*/

/***Last Modified plug-in to record last modified time***/ 
module.exports.lastModifiedPlugin = function lastModifiedPlugin (schema, options) {
  schema.add({ lastMod: Date })
  
  schema.pre('save', function (next) {
    this.lastMod = new Date
    next()
  })

  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}