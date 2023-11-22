import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { checkUser } from '../utils/auth';
import getAllCategories from '../api/categoryData';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';
import { getRecipes, getRecByCategory } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [dropdowns, setDropdowns] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const getAllRecipes = () => {
    getRecipes().then(setRecipes);
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    getAllCategories().then(setDropdowns);
    getAllRecipes();
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  const handleChange = (e) => {
    if (e.target.value === 'Select a Category') {
      getAllRecipes();
    } else {
      getRecByCategory(e.target.value).then(setRecipes);
    }
  };

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <>
          <div className="d-flex flex-row justify-content-between">
            <Link href="/recipes/new" passHref>
              <Button
                size="md"
                className="btn-m"
                style={{
                  backgroundColor: 'transparent', color: 'black', border: 'none', fontWeight: 600,
                }}
              >Create a Recipe
              </Button>
            </Link>
            <Form.Group className="mb-3" controlId="formGridLevel">
              <Form.Select
                aria-label="Category"
                name="categoryId"
                onChange={handleChange}
                className="mb-3"
                value={recipes.categoryId}
              >
                <option value="Select a Category">Select a Category</option>
                {
            dropdowns.map((dropdown) => (
              <option
                key={dropdown.id}
                value={dropdown.id}
              >
                {dropdown.name}
              </option>
            ))
          }
              </Form.Select>
            </Form.Group>
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
