import React, { useState } from 'react';

const API = 'http://localhost:3001/api';

export default function CreateOrder({ user, products, reload }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const selectedProduct = products.find(
    p => String(p.product_id) === String(productId)
  );

  async function submit(e) {
    e.preventDefault();
    setMessage('');

    if (!selectedProduct) {
      setMessage('لطفاً یک محصول انتخاب کنید.');
      return;
    }

    if (quantity < 1) {
      setMessage('تعداد باید حداقل ۱ باشد.');
      return;
    }

    try {
      const response = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          customer_id: user.user_id,
          product_id: selectedProduct.product_id,
          quantity: Number(quantity),
          unit_price: Number(selectedProduct.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ثبت سفارش ناموفق بود.');
      }

      setMessage('سفارش با موفقیت ثبت شد.');
      setProductId('');
      setQuantity(1);

      await reload();
    } catch (error) {
      setMessage(error.message);
    }
  }

  const total = selectedProduct
    ? Number(selectedProduct.price) * Number(quantity)
    : 0;

  return (
    <section className="card">
      <h2>ثبت سفارش جدید</h2>

      <form className="form-grid" onSubmit={submit}>
        <select
          value={productId}
          onChange={e => setProductId(e.target.value)}
        >
          <option value="">انتخاب محصول</option>

          {products.map(product => (
            <option
              key={product.product_id}
              value={product.product_id}
            >
              {product.name} - {Number(product.price).toLocaleString()} تومان
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="تعداد"
        />

        <div>
          مبلغ کل:{' '}
          <b>{total.toLocaleString()} تومان</b>
        </div>

        <button type="submit">
          ثبت سفارش
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}