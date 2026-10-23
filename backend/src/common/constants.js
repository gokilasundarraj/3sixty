export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'gokilas333@gmail.com')
  .split(',')
  .map(e => e.trim().toLowerCase());

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const AUTH_PROVIDERS = {
  LOCAL: 'local',
  GOOGLE: 'google',
};

export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  HIDDEN: 'hidden',
};

export const CALLBACK_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  COMPLETED: 'completed',
};

export const ORDER_STATUS = {
  INQUIRY: 'inquiry',
  QUOTE_SENT: 'quote_sent',
  IN_DEVELOPMENT: 'in_development',
  REVIEW: 'review',
  COMPLETED: 'completed',
};
