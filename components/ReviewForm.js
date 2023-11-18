import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import ReviewBox from './ReviewBox';
import { createReview, getReviewsByRecipe } from '../api/reviewData';

const initialState = '';

export default function ReviewForm({ onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const [reviews, setReviews] = useState();
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const getReviews = () => {
    getReviewsByRecipe(id).then(setReviews);
  };

  useEffect(() => {
    getReviews();
  }, [id, count]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      userName: user.fbUser.displayName,
      photoUrl: user.fbUser.photoURL,
      recipeId: id,
      userId: user[0].id,
    };
    createReview(payload).then(getReviewsByRecipe(id).then(setReviews));
    setCount(count + 1);
  };

  return (
    <>
      { user ? (
        <>
          <div className="d-flex flex-column" id="review-conainer" style={{ width: '1400px' }}>
            <Form onSubmit={handleSubmit} className="d-flex">
              <div className="d-flex" style={{ width: '1069px' }}>
                <Form.Control
                  type="text"
                  placeholder="Add a review..."
                  name="reviewString"
                  value={formInput.reviewString}
                  onChange={handleChange}
                  className="d-flex"
                  required
                />
              </div>
              <div className="text-right m-2" style={{ textAlign: 'right' }}>
                <Button type="submit" onClick={onUpdate} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Submit</Button>
              </div>
            </Form>
          </div>
          <div className="list-reviews">
            {reviews?.map((review) => <ReviewBox onUpdate={getReviews} revObj={review} />)}
          </div>
        </>
      ) : (
        <div className="list-reviews">
          {reviews?.map((review) => <ReviewBox revObj={review} />)}
        </div>
      )}
    </>
  );
}

ReviewForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
