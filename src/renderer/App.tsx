import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from '../utilities/db';

const Hello = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('fetchUsers', []);
    window.electron.ipcRenderer.on('receivedUsers', (args: User[]) => {
      setUsers(args);
    });

    window.electron.ipcRenderer.on('done', (user: User) => {
      setUsers((prevUsers) => {
        return [...prevUsers, user];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Name</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => {
          if (name) {
            window.electron.ipcRenderer.sendMessage('insertUser', [{ name }]);
          }
        }}
      >
        Click me
      </button>
      {users &&
        users.length !== 0 &&
        users.map((user) => <li key={user.id}>{user.name}</li>)}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
