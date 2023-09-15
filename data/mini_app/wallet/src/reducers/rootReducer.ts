import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { REDUX_ROOT_PERSIST_KEY } from 'config';

import collectibleBannerReducer from 'reducers/collectibles/collectibleBannerSlice';
import collectibleGroupedReducer from 'reducers/collectibles/collectibleGroupedSlice';
import scwReducer from 'reducers/scw/scwSlice';
import sendRequestReducer from 'reducers/sendRequest/sendRequestSlice';
import wpayReducer from 'reducers/wpay/wpaySlice';

import { withUserId } from 'utils/common/persist';

import giftReducer from './gift/giftSlice';
import kycReducer from './kyc/kycSlice';
import locationReducer from './location/locationSlice';
import p2pAdFormReducer from './p2p/adFormSlice';
import domReducer from './p2p/domSlice';
import p2pReducer from './p2p/p2pSlice';
import p2pUserReducer from './p2p/userSlice';
import passcodeReducer from './passcode/passcodeSlice';
import purchaseReducer from './purchase/purchaseSlice';
import collectibleReceiverSearchReducer from './receiverSearch/collectibleReceiverSearchSlice';
import receiverSearchReducer from './receiverSearch/receiverSearchSlice';
import sessionReducer from './session/sessionSlice';
import settingsReducer from './settings/settingsSlice';
import transactionDetailsReducer from './transactionDetails/transactionDetailsSlice';
import userReducer from './user/userSlice';
import walletReducer from './wallet/walletSlice';
import warningsVisibilityReducer from './warningsVisibility/warningsVisibilitySlice';

const persistConfig = {
  key: withUserId(REDUX_ROOT_PERSIST_KEY),
  keyPrefix: '',
  version: 1,
  storage,
  blacklist: [
    'currencies',
    'user',
    'session',
    'p2pUser',
    'p2p',
    'p2pAdForm',
    'receiverSearch',
    'wpay',
    'location',
    'settings',
    'passcode',
  ],
};

const userPersistConfig = {
  key: withUserId('wallet2.1-user'),
  keyPrefix: '',
  version: 1,
  storage,
  whitelist: ['featureFlags', 'permissions', 'isRussian'],
};

const p2pUserPersistConfig = {
  key: withUserId('p2pUser-1'),
  storage,
};

const p2pAdFormPersistConfig = {
  key: withUserId('p2pAdForm-2'),
  storage,
};

const p2pDomPersistConfig = {
  key: withUserId('p2pDom-1'),
  storage,
};

const p2pPersistConfig = {
  key: withUserId('p2p2-1'),
  storage,
  blacklist: ['isUserDismissedStartTradesModal', 'orderHistoryStatus'],
};

const locationPersistConfig = {
  key: withUserId('location1'),
  keyPrefix: '',
  version: 1,
  storage,
  blacklist: ['isUserNavigatedThroughPagesDuringCurrentSession'],
};

const passcodePersistConfig = {
  key: withUserId('passcode'),
  keyPrefix: '',
  version: 1,
  storage,
  whitelist: [
    'passcodeType',
    'recoveryEmail',
    'requiredOnOpen',
    'unlockDuration',
  ],
};

const settingsPersistConfig = {
  key: withUserId('settings-v1'),
  keyPrefix: '',
  version: 1,
  storage,
  blacklist: ['paymentCurrency'],
};

const scwPersistConfig = {
  key: withUserId('scw-1'),
  storage,
  whitelist: [
    'mnemonic',
    'address',
    'apps',
    'connections',
    'setupComplete',
    'recoveryComplete',
  ],
  blacklist: ['jettons', 'transactions', 'pendingTransactions'],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    purchase: purchaseReducer,
    warningsVisibility: warningsVisibilityReducer,
    transactionDetails: transactionDetailsReducer,
    kyc: kycReducer,
    gift: giftReducer,
    user: persistReducer(userPersistConfig, userReducer),
    session: sessionReducer,
    wallet: walletReducer,
    passcode: persistReducer(passcodePersistConfig, passcodeReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    p2p: persistReducer(p2pPersistConfig, p2pReducer),
    p2pUser: persistReducer(p2pUserPersistConfig, p2pUserReducer),
    p2pAdForm: persistReducer(p2pAdFormPersistConfig, p2pAdFormReducer),
    p2pDom: persistReducer(p2pDomPersistConfig, domReducer),
    location: persistReducer(locationPersistConfig, locationReducer),
    receiverSearch: receiverSearchReducer,
    collectibleReceiverSearch: collectibleReceiverSearchReducer,
    sendRequest: sendRequestReducer,
    wpay: wpayReducer,
    collectibleGrouped: collectibleGroupedReducer,
    scw: persistReducer(scwPersistConfig, scwReducer),
    collectibleBanner: collectibleBannerReducer,
  }),
);

export default rootReducer;
