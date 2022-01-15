export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userLogin = (payload) => ({
  type: SEND_EMAIL,
  payload,
});

export const expenses = (payload) => ({
  type: SEND_EXPENSES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});
