import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, [])

  async function getTransactions() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/transaction`; // No typos or extra characters
    const response = await fetch(apiUrl);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/transaction`; // No typos or extra characters
    const price = name.split(' ')[0];

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { name:name.substring(price.length+1),
            description,
            datetime 
          }),
    })
    .then(response => response.json())
    .then(json => {
        setName(''),
        setDatetime(''),
        setDescription('');
        console.log('result', json)
    })
}

  let balance = 0;
  for(const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <>
      <main>
        <h1>${balance}<span>{fraction}</span></h1>
        <form onSubmit={addNewTransaction}>
          <div className="basics">
            <input 
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder={'add new transaction'} 
            />
            <input 
              type="datetime-local" 
              value={datetime}
              onChange={ev => setDatetime(ev.target.value)} 
            />
          </div>
          <div className="description">
            <input 
              type="text" 
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder={'description'} 
            />
          </div>
          <button type="submit">Add new transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"price " +(transaction.price < 0 ? 'red': 'green')}>{transaction.price}</div>
                <div className="datetime">2022-12-18 15:45</div>
              </div>
            </div>
          ))}
          <div className="transaction">
            <div className="left">
              <div className="name">New TV</div>
              <div className="description">It was time for new tv</div>
            </div>
            <div className="right">
              <div className="price red">-$500</div>
              <div className="datetime">2022-12-18 15:45</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
