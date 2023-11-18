import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateRecipeForm from '../../../components/RecipeForm';
import { getSingleRecipe } from '../../../api/recipeData';

export default function EditRecipe() {
  const [editRecipe, setEditRecipe] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id).then(setEditRecipe);
  }, [id]);

  return (<CreateRecipeForm recipeObj={editRecipe} />);
}
