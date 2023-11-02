import React, { useEffect } from 'react'
import './App.css';
import TopNav from './components/TopNav/TopNav';
import Panel from './components/Panel/Panel';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllData } from './Actions/DataAction';
import Footer from './components/Footer/footer'

const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);

  useEffect(() => {
    if (!allTickets) {
      dispatch(fetchAllData());
    }
  }, [dispatch, allTickets])

  return (
    <div style={{ paddingTop: "10px" }}>
      <TopNav />
      <hr style={{ display: "flex",
    justifyContent: "center",
    alignItems: "center" }} />
      {allTickets ? <Panel /> : "Loading..."}

      <Footer/>
    </div>
  );
}

export default App
