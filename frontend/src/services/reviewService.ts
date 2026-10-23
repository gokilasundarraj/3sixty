import { apiRequest } from './api';
import { FeedbackItem } from '../types';

export const reviewService = {
  async getApprovedReviews(): Promise<FeedbackItem[]> {
    const res = await apiRequest<FeedbackItem[]>('/reviews');
    if (res.success && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },

  async createReview(data: {
    userName: string;
    phone: string;
    rating: number;
    message: string;
    projectType?: string;
    imageFile?: File | null;
  }) {
    if (data.imageFile) {
      const formData = new FormData();
      formData.append('userName', data.userName.trim());
      formData.append('phone', data.phone.trim());
      formData.append('rating', String(data.rating));
      formData.append('message', data.message.trim());
      formData.append('projectType', data.projectType || 'Customer Review');
      formData.append('image', data.imageFile);

      return apiRequest<FeedbackItem>('/reviews', {
        method: 'POST',
        body: formData,
      });
    }

    return apiRequest<FeedbackItem>('/reviews', {
      method: 'POST',
      body: JSON.stringify({
        userName: data.userName.trim(),
        phone: data.phone.trim(),
        rating: data.rating,
        message: data.message.trim(),
        projectType: data.projectType || 'Customer Review',
      }),
    });
  },

  async deleteReview(id: string) {
    return apiRequest(`/reviews/${id}`, {
      method: 'DELETE',
    });
  },
};

export default reviewService;
