import { venmo } from '@ticketmaster/digital-wallet';

const getNonceFromUrl = url => {
    const queryParams = url.split('&');
    const nonceParam = queryParams.find(q => q.match('paymentMethodNonce'));
  
    return nonceParam.split('=')[1];
};

const hasSuccessResponseInUrl = url => url.match('venmoSuccess=1');

let IS_INITIALIZED = false;

export const init = ({ braintreeClient }) => new Promise((resolve, reject) => {
  const deepLinkReturnUrl = window.parent.location.href;

  venmo.init({
    braintreeClient,
    deepLinkReturnUrl,
    onFailure: reject,
    onSuccess: resolve,
  });
}).then(() => {
  console.log('---------------------------------> INIT SUCCESS');
  IS_INITIALIZED = true;
}).catch(e => {
  IS_INITIALIZED = false;
  console.log('---------------------------------> INIT FAILED', e);
});

export const isInitialized = () => IS_INITIALIZED;

export const tokenize = () => new Promise((resolve, reject) => {
  console.log('---------------------------------> ENTER TO TOKENIZE METHOD');
  const onFailure = e => {
    const url = window.parent.location.href;
    if (hasSuccessResponseInUrl(url)) {
      console.log('---------------------------------> HAS SUCCESS RESPONSE IN URL');
      const nonce = getNonceFromUrl(url);
      return resolve(nonce);
    }
    console.log('---------------------------------> ON FAILURE: ERROR: ', e);
    return reject(e);
  };

  const onSuccess = payload => {
    console.log('---------------------------------> ON SUCCESS: PAYLOAD: ', payload);
    return resolve(payload);
  };

  venmo.onVenmoSelect({
    onFailure,
    onSuccess,
  });
});
