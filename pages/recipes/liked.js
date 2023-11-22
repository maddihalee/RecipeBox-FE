import { useEffect, useState } from 'react';
import { getFavoriteRecipes } from '../../api/recipeData';
import RecipeCard from '../../components/RecipeCard';
import { useAuth } from '../../utils/context/authContext';

export default function LikedRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useAuth();

  const getFavorites = () => {
    getFavoriteRecipes(user[0].id).then(setFavoriteRecipes);
    console.warn(user[0].id);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {favoriteRecipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipeObj={recipe} onUpdate={getFavorites} />
      ))}
    </div>
  );
}
