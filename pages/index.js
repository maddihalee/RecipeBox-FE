import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { signOut, checkUser } from '../utils/auth';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    console.warn('thisUser', authUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h1>Hello {user?.fbUser?.displayName}! </h1>
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
