import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSingleRecipe, getSingleRecipe } from '../../api/recipeData';

export default function ViewRecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const deleteRecipe = () => {
    if (window.confirm(`Are you sure you want to delete ${recipeDetails.name}?`)) {
      deleteSingleRecipe(recipeDetails.id).then(() => router.push('/'));
    }
  };

  const getRecipe = () => {
    getSingleRecipe(id).then((data) => setRecipeDetails(data));
  };

  useEffect(() => {
    getRecipe();
    console.warn(recipeDetails);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end mt-5 mb-0">
        <Link href={`/recipes/edit/${recipeDetails.id}`} passHref>
          <Button
            variant="info"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'black',
            }}
          >
            EDIT
          </Button>
        </Link>
        <Button
          onClick={deleteRecipe}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'black',
          }}
          className="d-flex justify-content-end"
        >
          DELETE
        </Button>
      </div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-row">
          <div>
            <img src={recipeDetails.imgUrl} alt={recipeDetails.name} style={{ width: '400px', height: '400px' }} />
          </div>
          <div className="text-black ms-5 details align-self-center">
            <h2>{recipeDetails.name}</h2>
            <p>{recipeDetails.cookTime}</p>
            <p>{recipeDetails.ingredients}</p>
            <p>{recipeDetails.directions}</p>
          </div>
        </div>
      </div>
    </>
  );
}
