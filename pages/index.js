import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { checkUser } from '../utils/auth';
import getAllCategories from '../api/categoryData';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';
import { getRecipes } from '../api/recipeData';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [dropdowns, setDropdowns] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // const [category, setCategory] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  const getAllRecipes = () => {
    getRecipes().then(setRecipes);
  };

  useEffect(() => {
    getAllCategories().then(setDropdowns);
    getAllRecipes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    recipes.filter((recipe) => recipe.includes());
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
                onClick={handleClick}
              >
                <option value="">Select a Category</option>
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
