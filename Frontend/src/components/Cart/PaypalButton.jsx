import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            onSuccess(details);
          });
        }}
        onError={err => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
