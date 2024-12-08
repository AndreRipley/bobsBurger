const vgsForm = window.VGSCollect.create(
  'tntuhgd7cfs',
  'sandbox', 
  (state) => {}).setRouteId('');

const css = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
  color: '#000000',
  '&::placeholder': {
    color: '#bcbcbc'
  }
};

const cardHolder = vgsForm.field('#cc-holder', {
  type: 'text',
  name: 'card_holder',
  placeholder: 'John Doe',
  validations: ['required'],
  css: css,
  });

const cardNumber = vgsForm.field('#cc-number', {
  type: 'card-number',
  name: 'card_number',
  placeholder: '4111 1111 1111 1111',
  showCardIcon: true,
  validations: ['required', 'validCardNumber'],
  css: css,
  });

const cardSecurityCode = vgsForm.field('#cc-cvc', {
  type: 'card-security-code',
  name: 'card_cvc',
  placeholder: '123',
  showCardIcon: true,
  validations: ['required', 'validCardSecurityCode'],
  css: css,
  });

const cardExpDate = vgsForm.field('#cc-expiration-date', {
  type: 'card-expiration-date',
  name: 'card_exp',
  placeholder: 'MM / YY',
  validations: ['required', 'validCardExpirationDate'],
  css: css,
  });

  const submitVGSCollectForm = () => {
    vgsForm.submit('/post', {}, (status, response) => {
      if (status >= 200 && status < 300) {
        // Successful response: Extract tokenized values
        const tokenizedData = response.data;
  
        // Display tokenized values on the current page
        const displayContainer = document.createElement('div');
        displayContainer.id = 'tokenized-display';
        displayContainer.innerHTML = `
          <h3>Tokenized Values Received</h3>
          <p><strong>Card Holder:</strong> ${tokenizedData.card_holder || 'N/A'}</p>
          <p><strong>Card Number:</strong> ${tokenizedData.card_number || 'N/A'}</p>
          <p><strong>Expiration Date:</strong> ${tokenizedData.card_exp || 'N/A'}</p>
          <p><strong>CVV:</strong> ${tokenizedData.card_cvc || 'N/A'}</p>
        `;
  
        // Append to the body or a specific section of the page
        const existingContainer = document.getElementById('tokenized-display');
        if (existingContainer) {
          existingContainer.replaceWith(displayContainer);
        } else {
          document.body.appendChild(displayContainer);
        }
      } else if (status === 0) {
        // Network Error
        alert('Network error occurred. Please try again.');
      } else {
        // Server Error
        alert('Error submitting the payment. Please try again.');
      }
    }, (validationErrors) => {
      // Validation errors
      alert('Form validation failed. Please check your inputs.');
      console.log(validationErrors);
    });
  };
  
 

document.getElementById('vgs-collect-form').addEventListener('submit', (e) => {
  e.preventDefault();
  submitVGSCollectForm();
});