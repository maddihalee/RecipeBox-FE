import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { checkUser } from '../utils/auth';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';
import { getRecipes } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    console.warn('thisUser', authUser);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  const getAllRecipes = () => {
    getRecipes().then(setRecipes);
  };

  useEffect(() => {
    getAllRecipes();
  });

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <>
          <div className="d-flex flex-row justify-content-between">
            <Link href="/charities/new" passHref>
              <Button
                size="md"
                className="btn-m"
                style={{
                  backgroundColor: 'transparent', color: 'black', border: 'none', fontWeight: 600,
                }}
              >Create
              </Button>
            </Link>
          </div>
          <hr className="hr-m mb-4 w-10" />
          <div className="d-flex flex-wrap justify-content-center">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.id} recipeObj={recipe} onUpdate={getAllRecipes} />
            ))}
          </div>
        </>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
