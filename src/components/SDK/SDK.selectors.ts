import { createSelector } from 'reselect';

export const sdkSelector = createSelector(
  (state: any) => state.sdk,
  (sdk) => sdk
);
