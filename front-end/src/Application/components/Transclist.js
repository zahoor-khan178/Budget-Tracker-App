import { useState, useEffect } from "react";
import '../Css/Tlist.css'
// import './Transaclist.css'; // Import the CSS

const Transaclist = () => {
  // State to store the transaction data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the transaction data from the backend API when the component mounts
  // useEffect(() => {
  //   fetch('http://localhost:11000/list') // Ensure this URL matches your backend endpoint
  //     .then((response) => response.json())  // Parse the JSON response.convert data into javaScritp object form
  //     .then((data) => {
  //       setTransactions(data);  // Set the transaction data
  //       setLoading(false);  // Set loading to false once data is fetched
  //     })
  //     .catch((error) => {
  //       setError(error);  // Handle any error
  //       setLoading(false);
  //     });
  // }, []); // Empty dependency array ensures this runs only once when the component mounts


  useEffect(()=>{

 getdata();
  
    
  },[]);

  const getdata=async()=>{

    const response=await fetch('http://localhost:11000/list');
     let data= await response.json();
  try
  {
         setTransactions(data);
        
         setLoading(false);
  }
  catch(error)
  {
    setError(error);
    setLoading(false);
  }


  }


 
  

 
  // Function to handle the deletion of a transaction
  const deleteTransaction = (id) => {
    fetch(`http://localhost:11000/delete/${id}`, {
      method: 'DELETE',  // HTTP DELETE method
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted transaction from the state
          setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction._id !== id)
          );
        } else {
          alert('Failed to delete transaction');
        }
      })
      .catch((error) => {
        alert('Error deleting transaction: ' + error.message);
      });
  };

  // Render loading, error, or the transaction list
  if (loading) {
    return <div className="ding-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="transaclist-container">
      <h2>Transaction List</h2>
      <ul className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <li className="transaction-item" key={transaction._id}>
              <span><strong>Title:</strong> {transaction.title}</span>
              <span><strong>Amount:</strong> ${transaction.amount}</span>
              <span><strong>Category:</strong> {transaction.category}</span>
              <span><strong>Transaction Type:</strong> {transaction.transactionType}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTransaction(transaction._id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No transactions available</li>
        )}
      </ul>
    </div>
  );
};

export default Transaclist;
