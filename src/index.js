
import { init, tokenize, isInitialized } from './venmo-service.js'
import { client } from 'braintree-web';

// ------------Init Braintree and Venmo ---------------
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);


(async () => {
    
    const braintreeClient = await client.create({
    authorization: 'sandbox_tmxhyf7d_dcpspy2brwdjr3qn'
    });
    console.log('braintreeClient: ', braintreeClient);
    if (isMobile()) {
        if (!isInitialized()) {
            await init({braintreeClient});
        }
    }
    
})();

const venmoButton = document.getElementById('venmo-button');
venmoButton.addEventListener('click',  async function (e) {
    e.preventDefault();
    if (isInitialized()) {
 await tokenize(); 
    }
});
