import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews text-center">
      <h3>Other's Reviews:</h3>
      <hr className="w-50" />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr className="w-50" />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
