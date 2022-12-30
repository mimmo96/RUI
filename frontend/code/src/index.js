import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';
 window.time_point = 1;
 window.chart_piece_count = [[], []];


// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyB4L_9-Njajr0JXpPxI6g9rhyiFxWyOdj0",
   authDomain: "mariorui-bc1e2.firebaseapp.com",
   databaseURL: "https://mariorui-bc1e2-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "mariorui-bc1e2",
   storageBucket: "mariorui-bc1e2.appspot.com",
   messagingSenderId: "436006171564",
   appId: "1:436006171564:web:c886dec9d767d9a3780009"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const starCountRef = ref(db, '/');
let counter = 0;
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(counter>0){
    Swal.fire({
      icon: 'warning',
      confirmButtonColor: '#1890ff',
      title: 'WARNING',
      text: data.message,
    })
  }
  counter = counter + 1;
});

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
