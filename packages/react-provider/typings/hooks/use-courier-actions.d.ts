declare const useCourierActions: (
  dispatch: any
) => {
  initToast: (payload: any) => void;
  initInbox: (payload: any) => void;
  createTrackEvent: (trackingId: any) => void;
  createBatchTrackEvent: (eventType: any) => void;
};
export default useCourierActions;
//# sourceMappingURL=use-courier-actions.d.ts.map
