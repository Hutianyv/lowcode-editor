const t = require('@babel/types');
const generate = require('@babel/generator').default;
const template = require('@babel/template').default;

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

module.exports = function({ types }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) return;

        const calleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;
          let formattedFilename = state.filename || 'unknown file';
          formattedFilename = formattedFilename.replace(/\\/g, '/');
          const newNode = template.expression(`console.log("${formattedFilename}: ${line}:${column}")`)();
          newNode.isNew = true;
          if (path.findParent(path => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      }
    }
  };
};
