import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import AddJournalEntryPage from '../AddJournalEntryPage/AddJournalEntryPage';
import MyJournalsPage from '../MyJournalsPage/MyJournalsPage';
import NavBar from '../../components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snowfall from 'react-snowfall'
import '../App/App.css';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
        <Snowfall snowflakeCount={100} />
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/journals/new" element={<AddJournalEntryPage user={user} />} />
            <Route path="/journals" element={<MyJournalsPage user={user} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
