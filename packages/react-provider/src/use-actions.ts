import useCourier from './use-courier';

export default () => {
  const { dispatch } = useCourier();
  return {
    initToast: (payload) => {
      dispatch({
        type: "INIT_TOAST",
        payload
      });
    }
  }
}