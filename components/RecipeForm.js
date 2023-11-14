import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createRecipe, updateRecipe } from '../api/recipeData';
import getAllCategories from '../api/categoryData';

const initialState = {
  name: '',
  directions: '',
  ingredients: '',
  cookTime: '',
  imgUrl: '',
};

export default function CreateRecipeForm({ recipeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [category, setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategory);
    if (recipeObj.id) setFormInput(recipeObj);
  }, [recipeObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeObj.id) {
      updateRecipe(formInput).then(() => router.push(`/recipes/${recipeObj.id}`));
    } else {
      createRecipe(formInput).then(() => router.push('/'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{recipeObj.id ? 'Update' : 'Create'} Recipe</h2>

      <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name"
          name="name"
          value={formInput.name}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Ingredients" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Ingredients"
          name="ingredients"
          value={formInput.ingredients}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Directions" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Directions"
          name="directions"
          value={formInput.directions}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Cook Time" className="mb-3">
        <Form.Control
          type="text"
          placeholder="cookTime"
          name="cookTime"
          value={formInput.cookTime}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ImgUrl"
          name="imgUrl"
          value={formInput.imgUrl}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={recipeObj.categoryId}
        >
          <option value="">Select a Category</option>
          {
            category.map((categories) => (
              <option
                key={categories.id}
                value={categories.id}
              >
                {categories.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{recipeObj.id ? 'Update' : 'Create'} Recipe</Button>
    </Form>
  );
}

CreateRecipeForm.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    directions: PropTypes.string,
    cookTime: PropTypes.string,
    ingredients: PropTypes.string,
    imgUrl: PropTypes.string,
    categoryId: PropTypes.number,
  }).isRequired,
};
