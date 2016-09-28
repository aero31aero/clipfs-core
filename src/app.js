var fuse = require('fuse-bindings');
var mountPath = '/home/rohitt/Desktop/mnt';
var actions = require('./fuse-actions');

fuse.mount(mountPath, actions, function (err) {
  if (err) {
    throw err;
  }
  console.log('Fuse: Filesystem Mounted On', mountPath);
});

process.on('SIGINT', function () {
  console.log("Fuse: Unmounting...");
  fuse.unmount(mountPath, function () {
    console.log("Fuse: Unmounted Successfully.");
    process.exit();
  });
});
