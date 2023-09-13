import BudgetsPasge from './pages/BudgetsPasge';
import './App.css';
import { useTheme } from './services/context/darkmodeContext';

const  App = () => {
  const {mode} = useTheme();


  return (
    <div  className={`${mode? "App" : "App_dark"}`}>
        <BudgetsPasge/>
    </div>
  );
}

export default App;
