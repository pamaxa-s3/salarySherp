import style from './App.module.scss';
import InputBlock from './components/inputBlock/InputBlock.component';
import ViewData from './components/viewData/ViewData.component';

function App() {
  return (
    <div className={style.app}>
      <div className={style.wrapper}>
        <h1>Расчёт оплаты</h1>
        <InputBlock />
        <ViewData />
      </div>
    </div>
  );
}

export default App;
