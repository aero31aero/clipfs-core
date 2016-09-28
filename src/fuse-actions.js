module.exports = function () {
  var fuse = require('fuse-bindings');

  var readdir = function (path, cb) {
    console.log('readdir(%s)', path);
    if (path === '/') {
      return cb(0, ['test']);
    }
    return cb(0);
  };

  var getattr = function (path, cb) {
    console.log('getattr(%s)', path);
    if (path === '/') {
      cb(0, {
        mtime: new Date(),
        atime: new Date(),
        ctime: new Date(),
        size: 100,
        mode: 16877,
        uid: process.getuid(),
        gid: process.getgid()
      });
      return null;
    }

    if (path === '/test') {
      cb(0, {
        mtime: new Date(),
        atime: new Date(),
        ctime: new Date(),
        size: 12,
        mode: 33188,
        uid: process.getuid(),
        gid: process.getgid()
      });
      return null;
    }
    cb(fuse.ENOENT);
  };

  var open = function (path, flags, cb) {
    console.log('open(%s, %d)', path, flags);
    cb(0, 42); // 42 is an fd
  };

  var read = function (path, fd, buf, len, pos, cb) {
    console.log('read(%s, %d, %d, %d)', path, fd, len, pos);
    var str = 'hello world\n'.slice(pos);
    if (!str) {
      return cb(0);
    }
    buf.write(str);
    return cb(str.length);
  };

  return {
    read: read,
    readdir: readdir,
    open: open,
    getattr: getattr,
  };

}();
