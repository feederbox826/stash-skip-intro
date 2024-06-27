const annotation = require('eslint-plugin-annotation');

module.exports = {
    "plugins": {
        annotation
    },
    "rules": {
        'annotation/format-date': 'error',
        'annotation/sort-keys': 'error',
        'annotation/sort': 'error',
        'annotation/unique': 'error',
    }
}