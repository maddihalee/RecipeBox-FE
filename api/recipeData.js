const dbUrl = 'https://localhost:7007';

const getRecipes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipe/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getRecByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/category/${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const favoriteRecipe = (recipeId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/addtofavorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipeId,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getFavoriteRecipes = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/favorites/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteSingleRecipe,
  getRecByCategory,
  favoriteRecipe,
  getFavoriteRecipes,
};
