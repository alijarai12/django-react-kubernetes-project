import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";


interface Expense {
  id: number;
  expense_name: string;
  amount: number;
  category_name: string;
  date: string;
}

interface Props {
  formdata?: Expense | null;
}

const Expenses = ({ formdata }: Props) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Expense[]>(`${API_BASE_URL}/expenses/`)
      .then((res) => setExpenses(res.data))
      .catch((error) => setError(error.message));
  }, [formdata]);

  const handleExpenseDelete = (id: number) => {
    const originalExpense = [...expenses];
    setExpenses(expenses.filter((e) => e.id !== id));

    axios.delete(`${API_BASE_URL}/expenses/${id}`).catch((err) => {
      setError(err.message);
      setExpenses(originalExpense);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.expense_name}</td>
                <td>${expense.amount}</td>
                <td>{expense.category_name}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-3"
                    to={`/updateform/${expense.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleExpenseDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Expenses;
