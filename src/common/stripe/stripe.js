import stripe from 'tipsi-stripe';
import stripeConfig from '../config/stripe';
import { getSettingsInfo } from '../firebase/database';

export async function initStripe() {
  try {
    console.log('==== initStripe...');
    const response = await getSettingsInfo();
    console.log('====== initStripe: response: ', response);
    if (response) {
      const stripeSettings = response['stripe'];
      console.log('====== stripe settings: ', stripeSettings);
      if (stripeSettings) {
        const mode = stripeSettings['mode'];
        const keys = (mode === "test") ? stripeSettings['test'] : stripeSettings['live'];
        const publishableKey = keys['publishKey'];
        console.log('====== stripe publishableKey: ', publishableKey);
        stripe.setOptions({
          publishableKey: publishableKey || stripeConfig.publishableKey,
          merchantId: 'merchant.laplus.tina'

        });
        return mode;
      }
    }
  } catch (error) {
    console.log('==== initStripe error: ', error);
  }
  return null;
}
