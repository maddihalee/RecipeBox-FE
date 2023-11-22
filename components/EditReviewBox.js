import { Form, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateReview } from '../api/reviewData';

export default function EditReviews({ revObj, onUpdate }) {
  const [editReview, setEditReview] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    updateReview(editReview).then(() => onUpdate());
  };

  useEffect(() => {
    setEditReview(revObj);
  }, [revObj]);

  return (
    <div className="d-flex flex-column" id="review-container" style={{ width: '1400px' }}>
      <Form onSubmit={handleClick} className="d-flex">
        <div className="d-flex" style={{ width: '1069px' }}>
          <Card.Img src={revObj.photoUrl} style={{ width: '50px' }} className="me-3 d-flex flex-column" />
          <Form.Control
            type="text"
            placeholder="Update your review..."
            name="reviewString"
            value={editReview?.reviewString}
            onChange={(e) => {
              const { name, value } = e.target;
              setEditReview((prevState) => ({
                ...prevState,
                [name]: value,
              }));
            }}
            className="d-flex"
            required
          />
        </div>
        <div className="text-right m-2" style={{ textAlign: 'right' }}>
          <Button type="submit" onClick={handleClick} style={{ borderRadius: '30px', height: '40px', fontWeight: '600' }}>Update Review</Button>
        </div>
      </Form>
    </div>
  );
}

EditReviews.propTypes = {
  revObj: PropTypes.shape({
    userName: PropTypes.string,
    reviewString: PropTypes.string,
    photoUrl: PropTypes.string,
    id: PropTypes.number,
    recipeId: PropTypes.number,
    userId: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};

EditReviews.defaultProps = {
  revObj: PropTypes.shape({
    userName: '',
    reviewString: '',
    userId: '',
  }),
  onUpdate: () => {},
};
