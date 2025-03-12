import { useState } from 'react';
import '../Css/Tform.css';
const TransactionForm = () => {
  // State for managing form inputs
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const formErrors = {};
    if (!title) {
      formErrors.title = 'Title is required';
    }
    if (amount <= 0) {
      formErrors.amount = 'Amount must be a positive number';
    }


    // console.log('Transaction Type:', transactionType);


    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {

        
        // Set loading state
        setIsLoading(true);

        // Submit form data to the backend API using fetch
        const response = await fetch('http://localhost:11000/transaction', {
          method: "POST",
          body: JSON.stringify({      // convert javaScript object data inot json format for security purpose.
            title,
            amount,
            category,
            transactionType
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to submit transaction');
        }

        

        // Handle the response (e.g., show a success message)
        const data = await response.json();
        alert('Transaction submitted successfully');
        console.log(data); // Log the response data for debugging

        // Clear form fields after successful submission
        setTitle('');
        setAmount('');
        setCategory('');
        setTransactionType('income');
        setErrors({});
      } catch (error) {
        // Handle any errors (e.g., network issues, server errors)
        console.error('Error submitting transaction:', error);
        alert('An error occurred while submitting the transaction');
      } finally {
        // Set loading state to false after request completes
        setIsLoading(false);
      }
    }
  };

  return (
    <div id='parent-div'>
      <h2>Transaction Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter transaction title"
          />
          {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div>

        {/* Amount Input */}
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
          {errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}
        </div>

        {/* Category Input */}
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        {/* Income/Expense Toggle */}
        <div>
          <label>Transaction Type:</label>
          <label className='radio'>
            <input
              type="radio"
              name="transactionType"
              value="income"
              checked={transactionType === 'income'}
              onChange={() => setTransactionType('income')}
            />
            Income
          </label>
          <label className='radio'>
            <input
              type="radio"
              name="transactionType"
              value="expense"
              checked={transactionType === 'expense'}
              onChange={() => setTransactionType('expense')}
            />
            Expense
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
