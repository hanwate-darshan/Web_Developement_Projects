**Redux Toolkit (RTK)** is the **official, recommended way to use Redux**.
It simplifies Redux development by reducing boilerplate, providing good defaults, and preventing common mistakes.

---

## What is Redux Toolkit?

Redux Toolkit is a package (`@reduxjs/toolkit`) that helps you:

* Write **less Redux code**
* Avoid common Redux bugs
* Set up a Redux store easily
* Handle immutable updates safely
* Work smoothly with **React (via `react-redux`)**

Redux Toolkit **wraps Redux best practices** into a simple API.

---

## Problems Redux Toolkit Solves

Traditional Redux required:

* Action types
* Action creators
* Reducers with switch statements
* Manual immutability

Redux Toolkit:

* Combines actions + reducers
* Uses **Immer** to allow “mutating” logic safely
* Auto-generates action creators
* Provides built-in middleware

---

## Core Concepts in Redux Toolkit

### 1. `configureStore`

Creates the Redux store with good defaults.

### 2. `createSlice`

Creates:

* Reducer
* Action creators
* Action types
  all in **one place**

### 3. `createAsyncThunk`

Handles async logic (API calls)

---

## Redux Toolkit Setup (React Example)

### 1️⃣ Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

---

### 2️⃣ Create the Store

📁 `src/app/store.js`

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

---

### 3️⃣ Create a Slice

📁 `src/features/counter/counterSlice.js`

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } =
  counterSlice.actions

export default counterSlice.reducer
```

👉 Note: Mutations are safe because RTK uses **Immer**

---

### 4️⃣ Provide the Store to React

📁 `src/main.jsx` or `index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

---

### 5️⃣ Use Redux State in Components

📁 `src/features/counter/Counter.jsx`

```js
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

export default function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

---

## Async Example with `createAsyncThunk`

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return response.json()
  }
)
```

RTK automatically generates:

* `pending`
* `fulfilled`
* `rejected` actions

---

## Why Use Redux Toolkit?

✅ Less boilerplate
✅ Easier to learn
✅ Better performance defaults
✅ Built-in DevTools support
✅ Recommended by Redux team

---


