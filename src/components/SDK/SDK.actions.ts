import { ACTION_TRIGGER_SDK } from './SDK.constant';

export const actionTriggerSDK = (payload: any) => ({
  type: ACTION_TRIGGER_SDK,
  payload,
});
