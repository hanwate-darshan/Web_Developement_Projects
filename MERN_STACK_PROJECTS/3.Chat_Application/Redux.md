# firstly installed react redux toolkit
- npm install @reduxjs/toolkit react-redux


# create a folder 'redux'
- store.js

```
import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
export  const store = configureStore({
    reducer:{
        user:userSlice
    }
})

```
- userSlice.js

```
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{ userData:null  },
    reducers:{ setUserData:(state,action)=>{ state.userData = action.payload  }}
})
export const { setUserData } = userSlice.actions;

export default userSlice.reducer

```

- main.jsx

```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import { store } from './redux/store.js';
export const serverURL = "http://localhost:3000";

createRoot(document.getElementById('root')).render(
  

  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
  
)


```


## - Installed redux toolkit extension

