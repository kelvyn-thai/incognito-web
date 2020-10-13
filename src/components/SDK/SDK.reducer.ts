import { ACTION_TRIGGER_SDK } from './SDK.constant';
import SDK from 'papp-sdk';

interface IReducer {}

const initialState: IReducer = {
  paymentAddress: '',
  allTokens: SDK?.SUPPORTED_TOKEN,
  supportedTokenIds: [],
  selectedPrivacy: null,
  customId: null,
  tokens: [],
};

export default (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case ACTION_TRIGGER_SDK: {
      const { key, value }: { key: string; value: any } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    }
    default:
      return state;
  }
};
