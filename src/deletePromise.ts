import store from './store';

const deleteModalPromise = () => new Promise<boolean>((resolve, reject) => {
  const unsubscribe = store.subscribe(() => {
    const { confirm, cancel } = store.getState().forms.deleteCurrent;
    if (confirm || cancel) {
      if (confirm) resolve();
      reject();

      unsubscribe();
    }
  });
});

export default deleteModalPromise;
