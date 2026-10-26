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

  async createReview(
    data: {
      userName: string;
      phone: string;
      rating: number;
      message: string;
      projectType?: string;
      /** Profile avatar file */
      imageFile?: File | null;
      /** Project proof / screenshot files (up to 5) */
      projectImageFiles?: File[];
    },
    /** Called before the automatic cold-start retry so the UI can show a message */
    onColdStart?: () => void,
  ) {
    // Always use FormData so multer can parse both image fields
    const formData = new FormData();
    formData.append('userName', data.userName.trim());
    formData.append('phone', data.phone.trim());
    formData.append('rating', String(data.rating));
    formData.append('message', data.message.trim());
    formData.append('projectType', data.projectType || 'Customer Review');

    if (data.imageFile) {
      formData.append('profileImage', data.imageFile);
    }

    if (data.projectImageFiles && data.projectImageFiles.length > 0) {
      for (const file of data.projectImageFiles) {
        formData.append('projectImages', file);
      }
    }

    // Do NOT set Content-Type header — browser must set it with the multipart boundary
    return apiRequest<FeedbackItem>(
      '/reviews',
      { method: 'POST', body: formData },
      onColdStart,
    );
  },

  async deleteReview(id: string) {
    return apiRequest(`/reviews/${id}`, { method: 'DELETE' });
  },
};

export default reviewService;
