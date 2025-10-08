'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Badge from './Badge';
import Alert from './Alert';

interface Review {
  id: number;
  productId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useLocalStorage<Review[]>('reviews', []);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    userEmail: '',
    rating: 5,
    comment: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const productReviews = reviews.filter(review => review.productId === productId);

  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: productReviews.filter(review => review.rating === star).length,
    percentage: productReviews.length > 0 
      ? (productReviews.filter(review => review.rating === star).length / productReviews.length) * 100 
      : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: string[] = [];
    
    if (!newReview.userName.trim()) {
      newErrors.push('Họ tên là bắt buộc');
    }
    
    if (!newReview.userEmail.trim()) {
      newErrors.push('Email là bắt buộc');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newReview.userEmail)) {
      newErrors.push('Email không hợp lệ');
    }
    
    if (!newReview.comment.trim()) {
      newErrors.push('Nhận xét là bắt buộc');
    } else if (newReview.comment.trim().length < 10) {
      newErrors.push('Nhận xét phải có ít nhất 10 ký tự');
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      const review: Review = {
        id: Date.now(),
        productId,
        userName: newReview.userName,
        userEmail: newReview.userEmail,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
        verified: true
      };

      setReviews(prev => [...prev, review]);
      setNewReview({
        userName: '',
        userEmail: '',
        rating: 5,
        comment: ''
      });
      setShowForm(false);
      setErrors([]);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return [1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type={interactive ? "button" : undefined}
        className={`star ${star <= rating ? 'active' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => setNewReview(prev => ({ ...prev, rating: star })) : undefined}
        disabled={!interactive}
      >
        <i className="fas fa-star"></i>
      </button>
    ));
  };

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3>Đánh giá sản phẩm</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          Viết đánh giá
        </button>
      </div>

      {showForm && (
        <div className="review-form">
          <h4>Đánh giá {productName}</h4>
          
          {errors.length > 0 && (
            <Alert type="error" message={errors.join(', ')} />
          )}

          <form onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label>Đánh giá của bạn</label>
              <div className="rating-input">
                {renderStars(newReview.rating, true)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="userName">Họ và tên *</label>
                <input
                  type="text"
                  id="userName"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userEmail">Email *</label>
                <input
                  type="email"
                  id="userEmail"
                  value={newReview.userEmail}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userEmail: e.target.value }))}
                  placeholder="Nhập email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Nhận xét *</label>
              <textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                rows={4}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reviews-summary">
        <div className="rating-overview">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span className="rating-count">({productReviews.length} đánh giá)</span>
          </div>

          <div className="rating-breakdown">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="rating-bar">
                <span className="star-label">{star} sao</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {productReviews.length === 0 ? (
          <div className="no-reviews">
            <i className="fas fa-comment"></i>
            <h4>Chưa có đánh giá nào</h4>
            <p>Hãy là người đầu tiên đánh giá sản phẩm này!</p>
          </div>
        ) : (
          productReviews
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h5>{review.userName}</h5>
                    {review.verified && (
                      <Badge text="Đã mua hàng" type="success" size="small" />
                    )}
                  </div>
                  <div className="review-meta">
                    <div className="stars">{renderStars(review.rating)}</div>
                    <span className="date">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
