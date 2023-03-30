const subs = new Map();

export default () => {
  const emitStart = () => {
    if (!subs.has('start')) return;

    subs.get('start').forEach((cb) => {
      cb();
    });
  };

  const onStart = (cb: () => void) => {
    if (!subs.has('start')) {
      subs.set('start', []);
    }

    subs.get('start').push(cb);
  };

  return {
    emitStart,
    onStart,
  };
};
