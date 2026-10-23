import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import CreateOrder from './components/CreateOrder';

const API = 'http://localhost:3001/api';



function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');

  const isRegister = mode === 'register';

  function getPasswordError(value) {
    if (value.length < 8) {
      return 'رمز عبور باید حداقل ۸ کاراکتر داشته باشد.';
    }

    if (!/[A-Za-z]/.test(value)) {
      return 'حداقل یک حرف انگلیسی وارد کنید.';
    }

    if (!/[0-9]/.test(value)) {
      return 'حداقل یک عدد وارد کنید.';
    }

    if (!/[^A-Za-z0-9]/.test(value)) {
      return 'حداقل یک نماد مانند @ یا ! وارد کنید.';
    }

    return '';
  }

  const passwordError = getPasswordError(password);
  const passwordValid = passwordError === '';

  async function submit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isRegister && passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? 'register' : 'login';

      const r = await fetch(`${API}/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.trim(),
          password
        })
      });

      const data = await r.json();

      if (!r.ok) {
        throw new Error(
          data.message ||
          (isRegister ? 'ثبت‌نام انجام نشد.' : 'ورود ناموفق بود.')
        );
      }

      if (isRegister) {
        setMessage('حساب کاربری ساخته شد. اکنون می‌توانید وارد شوید.');
        setMode('login');
        setPassword('');
      } else {
        onLogin(data);
      }
    } catch (e) {
      setError(e.message || 'ارتباط با سرور برقرار نشد.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-layout">
        <section className="login-intro">
          <div className="login-intro-brand">
            <span className="login-brand-mark">S</span>
            <span>
              STORE<span className="login-brand-accent">RBAC</span>
            </span>
          </div>

          <div className="login-intro-content">
            <span className="login-eyebrow">STORE MANAGEMENT SYSTEM</span>

            <h1>
              مدیریت فروشگاه،
              <br />
              <span>ساده و هوشمند.</span>
            </h1>

            <p>
              به پنل فروشگاه خوش آمدید. محصولات و سفارش‌ها را
              متناسب با سطح دسترسی حساب کاربری خود مدیریت کنید.
            </p>

            <div className="login-feature-list">
              <div className="login-feature">
                <span className="login-feature-icon">✓</span>
                <span>مدیریت متمرکز محصولات و سفارش‌ها</span>
              </div>

              <div className="login-feature">
                <span className="login-feature-icon">✓</span>
                <span>کنترل دسترسی مبتنی بر نقش کاربر</span>
              </div>

              <div className="login-feature">
                <span className="login-feature-icon">✓</span>
                <span>محیط کاربری ساده و یکپارچه</span>
              </div>
            </div>
          </div>

          <div className="login-intro-footer">
            STORE RBAC <span>•</span> فروشگاه امن و یکپارچه
          </div>
        </section>

        <section className="login-form-side">
          <div className="login-form-heading">
            <span className="login-form-icon">↙</span>
            <span className="login-form-label">
              {isRegister ? 'ثبت‌نام کاربران' : 'ورود کاربران'}
            </span>
          </div>

          <h2>{isRegister ? 'ایجاد حساب کاربری' : 'خوش آمدید!'}</h2>

          <p className="login-form-description">
            {isRegister
              ? 'برای ساخت حساب مشتری، اطلاعات زیر را وارد کنید.'
              : 'برای ورود به پنل، اطلاعات حساب خود را وارد کنید.'}
          </p>

          <form className="login login-modern" onSubmit={submit}>
            <label htmlFor="login-username">نام کاربری</label>

            <input
              id="login-username"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="نام کاربری خود را وارد کنید"
              minLength={isRegister ? 6 : undefined}
              required
            />

            <label htmlFor="login-password">رمز عبور</label>

            <input
              id="login-password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
              minLength={isRegister ? 8 : undefined}
              required
              aria-describedby={isRegister ? 'password-feedback' : undefined}
              aria-invalid={isRegister && password.length > 0 && !passwordValid}
            />

            {isRegister && (
              <div
                id="password-feedback"
                className={`password-feedback ${
                  passwordValid
                    ? 'password-feedback-success'
                    : 'password-feedback-error'
                }`}
                aria-live="polite"
              >
                {passwordValid
                  ? '✓ رمز عبور شرایط لازم را دارد.'
                  : passwordError}
              </div>
            )}

            {error && (
              <div className="error" role="alert">{error}</div>
            )}

            {message && (
              <div className="success" role="status">{message}</div>
            )}

            <button
              type="submit"
              disabled={loading || (isRegister && !passwordValid)}
            >
              {loading
                ? 'لطفاً صبر کنید...'
                : isRegister
                  ? 'ساخت حساب کاربری'
                  : 'ورود به حساب'}

              {!loading && (
                <span className="login-submit-arrow">←</span>
              )}
            </button>
          </form>

          <p className="login-form-description">
            {isRegister ? 'قبلاً حساب ساخته‌اید؟ ' : 'حساب کاربری ندارید؟ '}

            <button
              type="button"
              className="login-mode-toggle"
              onClick={() => {
                setMode(isRegister ? 'login' : 'register');
                setError('');
                setMessage('');
                setPassword('');
              }}
            >
              {isRegister ? 'ورود به حساب' : 'ثبت‌نام مشتری'}
            </button>
          </p>

          <p className="login-security-note">
            <span>◆</span>
            دسترسی شما بر اساس نقش کاربری تعیین می‌شود.
          </p>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [user,setUser] = useState(null);
  const [tab,setTab] = useState('dashboard');
  const [products,setProducts] = useState([]);
  const [orders,setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const [orderForm, setOrderForm] = useState({
    product_id: '',
    quantity: 1
  });

  const [orderMessage, setOrderMessage] = useState('');

  const load = async () => {
    const headers = {
      Authorization: `Bearer ${user.token}`
    };

    const p = await fetch(`${API}/products`, {
      headers
    }).then(r => r.json());

    setProducts(p);

    const ordersUrl = user.role === 'Customer'
      ? `${API}/orders?customer_id=${user.user_id}`
      : `${API}/orders`;

    const o = await fetch(ordersUrl, {
      headers
    }).then(r => r.json());

    setOrders(o);
  };

  async function createOrder(e) {
    e.preventDefault();
    setOrderMessage('');

    const product = products.find(
      p => String(p.product_id) === String(orderForm.product_id)
    );

    if (!product) {
      setOrderMessage('لطفاً یک محصول انتخاب کن.');
      return;
    }

    const quantity = Number(orderForm.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      setOrderMessage('تعداد باید یک عدد صحیح و مثبت باشد.');
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
          product_id: product.product_id,
          quantity,
          unit_price: Number(product.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'ثبت سفارش ناموفق بود.');
      }

      setOrderMessage('سفارش با موفقیت ثبت شد.');
      setOrderForm({ product_id: '', quantity: 1 });
      await load();

    } catch (error) {
      setOrderMessage(error.message || 'ارتباط با سرور برقرار نشد.');
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(`${API}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'تغییر وضعیت سفارش ناموفق بود.'
        );
      }

      await load();

      setToast({
        type: 'success',
        title: 'عملیات موفق',
        message: 'وضعیت سفارش با موفقیت تغییر کرد.'
      });

      setTimeout(() => {
        setToast(null);
      }, 3500);

    } catch (error) {
      setToast({
        type: 'error',
        title: 'خطا',
        message: error.message || 'ارتباط با سرور برقرار نشد.'
      });

      setTimeout(() => {
        setToast(null);
      }, 4000);
    }
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (!user) return <Login onLogin={setUser}/>;

  const isAdmin = user.role === 'Admin';
  const isWorker = user.role === 'Worker';
  const isCustomer = user.role === 'Customer';

  return (
    <div className="app">

      <aside>
        <div className="brand">
          STORE<span>RBAC</span>
        </div>

        <div className="user">
          {user.username}
          <small>{user.role}</small>
        </div>

        {['dashboard','products','orders'].map(x => (
          <button
            className={tab === x ? 'nav active' : 'nav'}
            onClick={() => setTab(x)}
            key={x}
          >
            {x === 'dashboard'
              ? 'داشبورد'
              : x === 'products'
                ? 'محصولات'
                : 'سفارش‌ها'}
          </button>
        ))}

        {(isAdmin || isWorker) && (
          <button
            className="nav"
            onClick={() => setTab('manage')}
          >
            مدیریت
          </button>
        )}

        <button
          className="nav logout"
          onClick={() => setUser(null)}
        >
          خروج
        </button>
      </aside>

      <main>

        {toast && (
          <div className={`toast-notification ${toast.type}`}>

            <div className="toast-icon">
              {toast.type === 'success' ? '✓' : '×'}
            </div>

            <div className="toast-content">
              <strong>{toast.title}</strong>
              <span>{toast.message}</span>
            </div>

            <button
              className="toast-close"
              onClick={() => setToast(null)}
              aria-label="بستن پیام"
            >
              ×
            </button>

          </div>
        )}

        <header>
          <div>
            <h1>
              {tab === 'dashboard'
                ? 'داشبورد'
                : tab === 'products'
                  ? 'محصولات'
                  : tab === 'orders'
                    ? 'سفارش‌ها'
                    : 'مدیریت'}
            </h1>

            <p className="muted">
              پنل فروشگاه و کنترل دسترسی
            </p>
          </div>

          <div className="badge">
            {user.role}
          </div>
        </header>

        {tab === 'dashboard' && (
          <Dashboard
            user={user}
            products={products}
            orders={orders}
            isCustomer={isCustomer}
          />
        )}

        {tab === 'products' && (
          <ProductsPage products={products} />
        )}

        {tab === 'orders' && (
          <OrdersPage
            user={user}
            products={products}
            orders={orders}
            isCustomer={isCustomer}
            isAdmin={isAdmin}
            isWorker={isWorker}
            reload={load}
            updateOrderStatus={updateOrderStatus}
          />
        )}

        {tab === 'manage' && (isAdmin || isWorker) && (
          <Manage
            user={user}
            reload={load}
          />
        )}

      </main>
    </div>
  );
}

function Dashboard({ user, products, orders, isCustomer }) {
  const pending = orders.filter(o => o.status === 'Pending').length;
  const completed = orders.filter(o => o.status === 'Completed').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length;

  const money = value =>
    Number(value || 0).toLocaleString('fa-IR');

  const statusLabel = status => {
    if (status === 'Pending') return 'در انتظار';
    if (status === 'Completed') return 'تکمیل‌شده';
    if (status === 'Cancelled') return 'لغوشده';
    return status || 'نامشخص';
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-content">
          <span className="dashboard-eyebrow">STORE MANAGEMENT SYSTEM</span>
          <h2>سلام، {user.username}!</h2>
          <p>
            به پنل مدیریت فروشگاه خوش آمدید.
            وضعیت محصولات و سفارش‌ها را از اینجا بررسی کنید.
          </p>
          <div className="dashboard-role">
            <span className="dashboard-role-dot" />
            حساب کاربری: {user.role}
          </div>
        </div>

        <div className="dashboard-welcome-art" aria-hidden="true">
          <div className="dashboard-art-circle">
            <span> S </span>
          </div>
          <div className="dashboard-art-small">RBAC</div>
        </div>
      </section>

      <div className="dashboard-section-heading">
        <div>
          <h2>نمای کلی فروشگاه</h2>
          <p>خلاصه‌ای از اطلاعات موجود در سیستم</p>
        </div>
      </div>

      <section className="dashboard-metrics">
        <article className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span className="dashboard-metric-icon metric-blue">▦</span>
            <span className="dashboard-metric-caption">موجود در سیستم</span>
          </div>
          <div className="dashboard-metric-number">
            {money(products.length)}
          </div>
          <div className="dashboard-metric-label">تعداد محصولات</div>
        </article>

        <article className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span className="dashboard-metric-icon metric-purple">▤</span>
            <span className="dashboard-metric-caption">
              {isCustomer ? 'حساب شخصی' : 'تمام سفارش‌ها'}
            </span>
          </div>
          <div className="dashboard-metric-number">
            {money(orders.length)}
          </div>
          <div className="dashboard-metric-label">
            {isCustomer ? 'سفارش‌های من' : 'تعداد سفارش‌ها'}
          </div>
        </article>

        <article className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span className="dashboard-metric-icon metric-orange">◷</span>
            <span className="dashboard-metric-caption">نیازمند پیگیری</span>
          </div>
          <div className="dashboard-metric-number">
            {money(pending)}
          </div>
          <div className="dashboard-metric-label">سفارش‌های در انتظار</div>
        </article>

        <article className="dashboard-metric">
          <div className="dashboard-metric-top">
            <span className="dashboard-metric-icon metric-green">✓</span>
            <span className="dashboard-metric-caption">وضعیت نهایی</span>
          </div>
          <div className="dashboard-metric-number">
            {money(completed)}
          </div>
          <div className="dashboard-metric-label">سفارش‌های تکمیل‌شده</div>
        </article>
      </section>

      <section className="dashboard-lower-grid">
        <div className="card dashboard-orders-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>{isCustomer ? 'آخرین سفارش‌های من' : 'آخرین سفارش‌ها'}</h2>
              <p>خلاصه سفارش‌های ثبت‌شده</p>
            </div>
            <span className="dashboard-mini-count">
              {money(orders.length)} مورد
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="dashboard-recent-orders">
              {orders.slice(-5).reverse().map(order => (
                <div className="dashboard-order-row" key={order.order_id}>
                  <div className="dashboard-order-info">
                    <span className="dashboard-order-symbol">#</span>
                    <div>
                      <strong>سفارش {money(order.order_id)}</strong>
                      <span>
                        {money(order.total_amount)} تومان
                      </span>
                    </div>
                  </div>

                  <span
                    className={`dashboard-order-status ${
                      order.status === 'Completed'
                        ? 'order-completed'
                        : order.status === 'Cancelled'
                          ? 'order-cancelled'
                          : 'order-pending'
                    }`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <span>▤</span>
              <strong>هنوز سفارشی ثبت نشده است</strong>
              <p>پس از ثبت سفارش، اطلاعات آن در این قسمت نمایش داده می‌شود.</p>
            </div>
          )}
        </div>

        <div className="card dashboard-status-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>وضعیت سفارش‌ها</h2>
              <p>توزیع سفارش‌ها بر اساس وضعیت</p>
            </div>
          </div>

          <div className="dashboard-status-list">
            <div className="dashboard-status-item">
              <div className="dashboard-status-label">
                <span className="status-dot status-dot-pending" />
                <span>در انتظار</span>
              </div>
              <strong>{money(pending)}</strong>
            </div>

            <div className="dashboard-status-track">
              <div
                className="dashboard-status-fill fill-pending"
                style={{
                  width: `${orders.length ? pending / orders.length * 100 : 0}%`
                }}
              />
            </div>

            <div className="dashboard-status-item">
              <div className="dashboard-status-label">
                <span className="status-dot status-dot-completed" />
                <span>تکمیل‌شده</span>
              </div>
              <strong>{money(completed)}</strong>
            </div>

            <div className="dashboard-status-track">
              <div
                className="dashboard-status-fill fill-completed"
                style={{
                  width: `${orders.length ? completed / orders.length * 100 : 0}%`
                }}
              />
            </div>

            <div className="dashboard-status-item">
              <div className="dashboard-status-label">
                <span className="status-dot status-dot-cancelled" />
                <span>لغوشده</span>
              </div>
              <strong>{money(cancelled)}</strong>
            </div>

            <div className="dashboard-status-track">
              <div
                className="dashboard-status-fill fill-cancelled"
                style={{
                  width: `${orders.length ? cancelled / orders.length * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div className="dashboard-access-note">
            <span>◇</span>
            <div>
              <strong>سطح دسترسی شما</strong>
              <p>
                اطلاعات و عملیات قابل دسترس بر اساس نقش کاربری شما تعیین می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrdersPage({
  user,
  products,
  orders,
  isCustomer,
  isAdmin,
  isWorker,
  reload,
  updateOrderStatus
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const money = value =>
    Number(value || 0).toLocaleString('fa-IR');

  const statusLabel = status => {
    if (status === 'Pending') return 'در انتظار';
    if (status === 'Completed') return 'تکمیل‌شده';
    if (status === 'Cancelled') return 'لغوشده';
    return status || 'نامشخص';
  };

  const pending = orders.filter(o => o.status === 'Pending').length;
  const completed = orders.filter(o => o.status === 'Completed').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = String(order.order_id)
      .includes(search.trim());

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-page">
      <section className="orders-hero">
        <div>
          <span className="orders-eyebrow">ORDER MANAGEMENT</span>
          <h2>{isCustomer ? 'سفارش‌های من' : 'مدیریت سفارش‌ها'}</h2>
          <p>
            {isCustomer
              ? 'سفارش‌های خود را بررسی و سفارش جدید ثبت کنید.'
              : 'سفارش‌ها را بررسی کنید و وضعیت آن‌ها را مدیریت کنید.'}
          </p>
        </div>

        <div className="orders-hero-mark" aria-hidden="true">O</div>
      </section>

      {isCustomer && (
        <CreateOrder
          user={user}
          products={products}
          reload={reload}
        />
      )}

      <section className="orders-metrics">
        <article className="orders-metric">
          <span className="orders-metric-icon orders-metric-blue">▤</span>
          <div>
            <span>کل سفارش‌ها</span>
            <strong>{money(orders.length)}</strong>
          </div>
        </article>

        <article className="orders-metric">
          <span className="orders-metric-icon orders-metric-orange">◷</span>
          <div>
            <span>در انتظار</span>
            <strong>{money(pending)}</strong>
          </div>
        </article>

        <article className="orders-metric">
          <span className="orders-metric-icon orders-metric-green">✓</span>
          <div>
            <span>تکمیل‌شده</span>
            <strong>{money(completed)}</strong>
          </div>
        </article>

        <article className="orders-metric">
          <span className="orders-metric-icon orders-metric-red">×</span>
          <div>
            <span>لغوشده</span>
            <strong>{money(cancelled)}</strong>
          </div>
        </article>
      </section>

      <section className="card orders-list-card">
        <div className="orders-list-heading">
          <div>
            <h2>فهرست سفارش‌ها</h2>
            <p>جزئیات و وضعیت سفارش‌های ثبت‌شده</p>
          </div>

          <span className="orders-count">
            {money(filteredOrders.length)} سفارش
          </span>
        </div>

        <div className="orders-toolbar">
          <div className="orders-search">
            <span>⌕</span>
            <input
              type="search"
              aria-label="جست‌وجو با شناسه سفارش"
              placeholder="جست‌وجو با شناسه سفارش..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="orders-filter"
            aria-label="فیلتر وضعیت سفارش"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="Pending">در انتظار</option>
            <option value="Completed">تکمیل‌شده</option>
            <option value="Cancelled">لغوشده</option>
          </select>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>مبلغ سفارش</th>
                  <th>وضعیت</th>
                  {(isAdmin || isWorker) && <th>عملیات</th>}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.order_id}>
                    <td>
                      <span className="orders-id">
                        #{money(order.order_id)}
                      </span>
                    </td>

                    <td className="orders-amount">
                      {money(order.total_amount)} تومان
                    </td>

                    <td>
                      <span
                        className={`orders-status ${
                          order.status === 'Completed'
                            ? 'orders-status-completed'
                            : order.status === 'Cancelled'
                              ? 'orders-status-cancelled'
                              : 'orders-status-pending'
                        }`}
                      >
                        <span className="orders-status-dot" />
                        {statusLabel(order.status)}
                      </span>
                    </td>

                    {(isAdmin || isWorker) && (
                      <td>
                        <select
                          className="orders-status-select"
                          aria-label={`تغییر وضعیت سفارش ${order.order_id}`}
                          value={order.status}
                          onChange={e =>
                            updateOrderStatus(order.order_id, e.target.value)
                          }
                        >
                          <option value="Pending">در انتظار</option>
                          <option value="Completed">تکمیل‌شده</option>
                          <option value="Cancelled">لغوشده</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="orders-empty">
            <span>▤</span>
            <strong>
              {orders.length === 0
                ? 'هنوز سفارشی ثبت نشده است'
                : 'سفارشی با این مشخصات پیدا نشد'}
            </strong>
            <p>
              {orders.length === 0
                ? 'پس از ثبت سفارش، اطلاعات آن در این بخش نمایش داده می‌شود.'
                : 'عبارت جست‌وجو یا فیلتر وضعیت را تغییر دهید.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function ProductsPage({ products }) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    String(product.name || '')
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const totalStock = products.reduce(
    (total, product) => total + (Number(product.stock) || 0),
    0
  );

  const lowStock = products.filter(
    product => Number(product.stock) <= 5
  ).length;

  return (
    <div className="products-page">
      <section className="products-overview">
        <div>
          <span className="products-eyebrow">INVENTORY MANAGEMENT</span>
          <h2>مدیریت محصولات</h2>
          <p>
            فهرست کالاها، قیمت‌ها و وضعیت موجودی فروشگاه را بررسی کنید.
          </p>
        </div>

        <div className="products-overview-mark">P</div>
      </section>

      <section className="products-stats">
        <article className="product-stat-card">
          <span className="product-stat-icon">▦</span>
          <div>
            <span>تعداد محصولات</span>
            <strong>{products.length.toLocaleString('fa-IR')}</strong>
          </div>
        </article>

        <article className="product-stat-card">
          <span className="product-stat-icon stock-icon">▤</span>
          <div>
            <span>مجموع موجودی</span>
            <strong>{totalStock.toLocaleString('fa-IR')}</strong>
          </div>
        </article>

        <article className="product-stat-card">
          <span className="product-stat-icon warning-icon">!</span>
          <div>
            <span>موجودی کم (۵ یا کمتر)</span>
            <strong>{lowStock.toLocaleString('fa-IR')}</strong>
          </div>
        </article>
      </section>

      <section className="card products-list-card">
        <div className="products-list-heading">
          <div>
            <h2>فهرست محصولات</h2>
            <p className="muted">
              اطلاعات ثبت‌شده در پایگاه داده فروشگاه
            </p>
          </div>

          <span className="products-count">
            {filteredProducts.length.toLocaleString('fa-IR')} کالا
          </span>
        </div>

        <div className="products-search">
          <span>⌕</span>
          <input
            type="search"
            aria-label="جست‌وجوی محصولات"
            placeholder="جست‌وجو بر اساس نام محصول..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-table-wrap">
            <table className="products-table">
              <thead>
                <tr>
                  <th>محصول</th>
                  <th>شناسه</th>
                  <th>قیمت</th>
                  <th>موجودی</th>
                  <th>وضعیت موجودی</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => {
                  const stock = Number(product.stock) || 0;

                  return (
                    <tr key={product.product_id}>
                      <td>
                        <div className="product-name-cell">
                          <span className="product-avatar">
                            {String(product.name || 'م').charAt(0)}
                          </span>
                          <strong>{product.name}</strong>
                        </div>
                      </td>

                      <td>
                        <span className="product-id">
                          #{product.product_id}
                        </span>
                      </td>

                      <td className="product-price">
                        {Number(product.price).toLocaleString('fa-IR')} تومان
                      </td>

                      <td>{stock.toLocaleString('fa-IR')} عدد</td>

                      <td>
                        <span
                          className={`stock-status ${
                            stock === 0
                              ? 'stock-empty'
                              : stock <= 5
                                ? 'stock-low'
                                : 'stock-available'
                          }`}
                        >
                          {stock === 0
                            ? 'ناموجود'
                            : stock <= 5
                              ? 'موجودی کم'
                              : 'موجود'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="products-empty">
            <span>⌕</span>
            <strong>محصولی پیدا نشد</strong>
            <p>عبارت دیگری را برای جست‌وجو امتحان کنید.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function Manage({user,reload}) {
  const [form,setForm]=useState({name:'',description:'',price:'',stock:''});
  const [message,setMessage]=useState('');
  
async function add(e) {
  e.preventDefault();

  try {
    const r = await fetch(`${API}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    const d = await r.json();
    setMessage(d.message || 'عملیات انجام نشد.');

    if (r.ok) {
      setForm({
        name: '',
        description: '',
        price: '',
        stock: ''
      });

      await reload();
    }
  } catch (error) {
    setMessage('ارتباط با سرور برقرار نشد.');
  }
}

  return <section className="card"><h2>افزودن محصول</h2><p className="muted">دسترسی این بخش برای Admin/Worker نمایش داده شده است.</p><form className="form-grid" onSubmit={add}><input placeholder="نام محصول" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="توضیحات" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><input type="number" placeholder="قیمت" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/><input type="number" placeholder="موجودی" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/><button>افزودن</button></form>{message&&<p>{message}</p>}</section>
}

createRoot(document.getElementById('root')).render(<App/>);