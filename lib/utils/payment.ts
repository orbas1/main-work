export interface OrderTotals {
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
}

export function calculateOrderTotals(
  price: number,
  taxRate = 0.1,
  discount = 0
): OrderTotals {
  const subtotal = price;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = subtotal + tax - discount;
  return { subtotal, tax, total, discount };
}
