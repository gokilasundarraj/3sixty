import { apiRequest } from './api';
import { CallbackRequest } from '../types';

export const callbackService = {
  async submitCallback(data: { name: string; phone: string; email?: string; projectType: string; message?: string }) {
    return apiRequest<CallbackRequest>('/callbacks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAllCallbacks(): Promise<CallbackRequest[]> {
    const res = await apiRequest<CallbackRequest[]>('/callbacks');
    return res.data || [];
  },

  async updateCallbackStatus(id: string, status: CallbackRequest['status']) {
    return apiRequest(`/callbacks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

export default callbackService;
