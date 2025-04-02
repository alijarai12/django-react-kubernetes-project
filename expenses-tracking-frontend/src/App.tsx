import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./components/Expenses";
import ExpensesForm from "./components/ExpensesForm";
import FormUpdateWrapper from "./components/FormUpdateWrapper";
import { useState } from "react";
import Expense from "./components/Expnese";

const App = () => {
  const [formdata, setFormData] = useState<Expense>();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ExpensesForm onSumbitForm={(data) => setFormData(data)} />
              <Expenses formdata={formdata} />
            </>
          }
        />
        <Route path="/updateform/:id" element={<FormUpdateWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
