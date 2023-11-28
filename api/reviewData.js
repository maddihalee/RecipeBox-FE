const dbUrl = 'https://localhost:7007';

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews`, {
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

const getSingleReview = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response)
    .then(resolve)
    .catch(reject);
});

const getReviewsByRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipes/${recipeId}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleReview, createReview, updateReview, getReviewsByRecipe, deleteSingleReview,
};
