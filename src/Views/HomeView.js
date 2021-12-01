import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import "./HomeView.css";

const HomeView = () => {
  const [expenses, setExpenses] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [singleExpense, setSingleExpense] = useState({
    item: "",
    date: "",
    amount: 0,
  });

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = async () => {
    console.log(apiUrl);
    const response = await axios.get(`${apiUrl}/expenses`);
    setExpenses(response.data);
    console.log(response);
  };

  const changeHandler = (event) => {
    setSingleExpense({
      ...singleExpense,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios.post(`${apiUrl}/expenses/expense`, singleExpense);
    console.log(singleExpense);
    setSingleExpense({
      item: "",
      date: "",
      amount: 0,
    });
    getExpenses();
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    await axios.delete(`${apiUrl}/expenses/expense/${id}`);
    console.log(singleExpense);
    setSingleExpense({
      item: "",
      date: "",
      amount: 0,
    });
    getExpenses();
  }

  return (
    <div className="container">
      <h2>Expenses</h2>
      <form>
        <input
          value={singleExpense.item}
          onChange={changeHandler}
          name="item"
          className="form-control"
          placeholder="item"
          type="text"
        />
        <input
          value={singleExpense.date}
          onChange={changeHandler}
          name="date"
          className="form-control"
          placeholder="date"
          type="date"
        />
        <input
          value={singleExpense.amount}
          onChange={changeHandler}
          name="amount"
          className="form-control"
          placeholder="amount"
          type="number"
        />
        <button
          onClick={submitHandler}
          className="form-control btn btn-primary"
        >
          Submit
        </button>
      </form>
      <Container style={{ marginTop: 10 }}>
        <div>
          {expenses &&
            expenses.map((expense) => (
              <div key={expense._id} className="expense-container">
                <h4 className="expense-item">{expense.item}</h4>
                <h4 className="expense-date">{expense.date}</h4>
                <h4 className="expense-amount">${expense.amount}</h4>
                <button onClick={(event) => handleDelete(event, expense._id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};
export default HomeView;
