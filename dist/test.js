'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var str = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA7CAIAAACsbq6gAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAFJSURBVGhD7Y5BjgMhDAT3IXvc//8sbyCWppVD7xhssCGJXKojuOunfSyVfoJKb+3x+6eJF9GsplPlUHyLYDKdgrziyhoz6dQxJ24t4Eun+XVxdwpHOq1Giet+rOm0Fys2nJjSaSlJjJkZp9NAntgzM0in69li1UYvne7uEdsG3i5dxPwINZ3O7RQFI+7T6dZ+0dGl0qNFR5ebdLpyStToVHqCqNHhdPp/VjQpVHqOaFKo9BzRpFDpOaJJodJzRJPCF6UL9P+UqNGp9ARRo3OTLtCV/aKjS6VHi44u9+kC3dopCkao6QJd3CbmR7xdOrYN9NIFupstVm0M0gW6nif2zHx1ukAbGWLJgyn9gsaixHU/jnSBVtfF3Sl86QJtr4iLs7jTLyjCK66sMZl+QUEW8TOCpfQX1PdfvAslJv0IlX6CSj9Bpe+ntSdprSzFFgWpbwAAAABJRU5ErkJggg==";

console.log(str.replace(/;base64,/, ''));

_fs2.default.writeFile("./test.jpg", str.replace(/^data:image\/\w+;base64,/, ''), { encoding: 'base64' }, function (err) {
    console.log(err);
});