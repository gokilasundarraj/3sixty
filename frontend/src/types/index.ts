export interface FeedbackItem {
  id?: string;
  _id?: string;
  userName: string;
  phone?: string;
  userPhoto?: string;
  userAvatar?: string;
  userEmail?: string;
  rating: number; // 1 to 5
  message: string;
  projectType: string;
  imageUrl?: string;
  status?: 'pending' | 'approved' | 'hidden';
  createdAt?: string;
}

export interface CallbackRequest {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  message?: string;
  status?: 'new' | 'contacted' | 'completed';
  createdAt?: string;
}

export interface DepartmentProjectIdea {
  title: string;
  domain: string;
  techStack: string[];
  description: string;
  ieeeCompliant: boolean;
  deliverables: string[];
}
