// Local data store fallback
import { FeedbackItem, CallbackRequest } from '../types';

const LOCAL_FEEDBACK_KEY  = '3sixty_local_feedback';
const LOCAL_CALLBACKS_KEY = '3sixty_local_callbacks';

function getLocalData<T>(key: string, defaultVal: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error', err);
  }
}

export async function submitFeedback(
  feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'status'>
): Promise<FeedbackItem> {
  const newItem: FeedbackItem = {
    ...feedback,
    id: `fb_${Date.now()}`,
    status: 'approved',
    createdAt: new Date().toISOString(),
  };
  const list = getLocalData<FeedbackItem[]>(LOCAL_FEEDBACK_KEY, []);
  list.unshift(newItem);
  setLocalData(LOCAL_FEEDBACK_KEY, list);
  return newItem;
}

export async function getApprovedFeedback(): Promise<FeedbackItem[]> {
  return getLocalData<FeedbackItem[]>(LOCAL_FEEDBACK_KEY, []).filter(i => i.status === 'approved');
}

export async function submitCallbackRequest(
  req: Omit<CallbackRequest, 'id' | 'createdAt' | 'status'>
): Promise<CallbackRequest> {
  const newItem: CallbackRequest = {
    ...req,
    id: `call_${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const list = getLocalData<CallbackRequest[]>(LOCAL_CALLBACKS_KEY, []);
  list.unshift(newItem);
  setLocalData(LOCAL_CALLBACKS_KEY, list);
  return newItem;
}
