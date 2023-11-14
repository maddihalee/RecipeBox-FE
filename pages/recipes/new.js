import CreateRecipeForm from '../../components/RecipeForm';

export default function CreatePage() {
  const recipeObj = {
    name: '',
    directions: '',
    ingredients: '',
    cookTime: '',
    imgUrl: '',
  };
  return (<CreateRecipeForm recipeObj={recipeObj} />);
}
