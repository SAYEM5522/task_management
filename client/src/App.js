import './App.css';
import MainView from './components/view/MainView';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <MainView/>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
/>
    </div>
  );
}

export default App;
