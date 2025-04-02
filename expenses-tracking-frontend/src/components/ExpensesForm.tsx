import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import Expense from "./Expnese";
import API_BASE_URL from "../config"; 

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(75),
  currency: z.number().min(0.01, "Amount must be at least 0.01").max(100000),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(100),
  date: z.string(),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSumbitForm: (data: Expense) => void;
}

const ExpensesForm = ({ onSumbitForm }: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <h1 className="text-center mb-3">Expenses</h1>
      <div className="formGroup">
        <form
          className="d-flex justify-content-between"
          onSubmit={handleSubmit((data) => {
            const formattedData: Expense = {
              id: 0,
              expense_name: data.name,
              amount: data.currency,
              category_name: data.category,
              date: data.date,
            };
            if (isValid) {
              onSumbitForm(formattedData);
            }
            axios
              .post<ExpenseFormData>(
                `${API_BASE_URL}/expenses/`,
                formattedData
              )
              .catch((err) => setError(err.message));

            reset();
          })}
        >
          <input
            {...register("name")}
            id="name"
            className="mb-3 mx-2 form-control"
            type="text"
            placeholder="Expense Name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}

          <input
            id="currency"
            {...register("currency", { valueAsNumber: true })}
            className="mb-3 mx-2 form-control"
            type="number" // Fixed type
            placeholder="Amount"
          />
          {errors.currency && (
            <p className="text-danger">{errors.currency.message}</p>
          )}

          <input
            {...register("category")}
            className="mb-3 mx-2 form-control"
            type="text"
            id="category"
            placeholder="Category"
          />
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}

          <input
            {...register("date")}
            id="date"
            className="mb-3 mx-2 form-control"
            type="text"
            placeholder="Date"
          />
          {errors.date && <p className="text-danger">{errors.date.message}</p>}

          <button
            className="btn btn-primary mb-3 text-nowrap"
            onClick={() => {}}
            type="submit"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpensesForm;
