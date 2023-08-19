

import 'bootstrap-icons/font/bootstrap-icons.css'
import Products from './components/Products';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div className="container max-w-7xl pt-10 px-5 mx-auto">
      <Products />

      <ToastContainer />
    </div>
  );
}
