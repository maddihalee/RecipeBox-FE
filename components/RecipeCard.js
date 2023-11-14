import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function RecipeCard({ recipeObj }) {
  return (
    <Card style={{
      width: '200 px', height: '250px', margin: '8px', backgroundColor: '#fff', color: 'black', boxShadow: '3px 3px 4px #9e9e9e', borderRadius: '18px',
    }}
    >
      <Link href={`/charities/${recipeObj.id}`} passHref>
        <div className="d-flex justify-content-start" style={{ padding: '10px 10px 0px 10px', gap: '2rem' }}>
          <Card.Img variant="top" src={recipeObj.imgUrl} alt="Recipe Picture" style={{ height: '200px' }} />
          <Card.Title className="align-self-center text-center fs-4">
            {recipeObj.name}
          </Card.Title>
        </div>
      </Link>
      <hr className="m-3" />

    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    directions: PropTypes.string,
    cookTime: PropTypes.string,
    ingredients: PropTypes.string,
    imgUrl: PropTypes.string,
  }).isRequired,
};
