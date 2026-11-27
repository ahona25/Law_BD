const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('lawbd_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err);
    throw err;
  }
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  demoLogin: (role) => request('/auth/demo-login', { method: 'POST', body: JSON.stringify({ role }) }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),

  // Laws
  getCategories: () => request('/laws/categories'),
  getLaws: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/laws${query ? `?${query}` : ''}`);
  },
  getLawById: (id) => request(`/laws/${id}`),
  toggleLawBookmark: (id) => request(`/laws/${id}/bookmark`, { method: 'POST' }),
  createLaw: (body) => request('/laws', { method: 'POST', body: JSON.stringify(body) }),
  updateLaw: (id, body) => request(`/laws/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  repealLaw: (id) => request(`/laws/${id}/repeal`, { method: 'PATCH' }),

  // Incidents
  triageIncident: (body) => request('/incidents/triage', { method: 'POST', body: JSON.stringify(body) }),

  // AI Assistant
  aiChat: (body) => request('/ai/chat', { method: 'POST', body: JSON.stringify(body) }),
  getAiStatus: () => request('/ai/status'),

  // Lawyers
  getLawyers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/lawyers${query ? `?${query}` : ''}`);
  },
  getLawyerById: (id) => request(`/lawyers/${id}`),
  compareLawyers: (lawyerIds) => request('/lawyers/compare', { method: 'POST', body: JSON.stringify({ lawyerIds }) }),
  toggleLawyerBookmark: (id) => request(`/lawyers/${id}/bookmark`, { method: 'POST' }),
  addLawyerReview: (id, body) => request(`/lawyers/${id}/reviews`, { method: 'POST', body: JSON.stringify(body) }),

  // Appointments
  createBooking: (body) => request('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  getMyBookings: () => request('/appointments/my'),
  getAppointmentById: (id) => request(`/appointments/${id}`),
  updateAppointmentStatus: (id, body) => request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify(body) }),

  // Messages
  getMessages: (appointmentId) => request(`/messages/${appointmentId}`),
  sendMessage: (body) => request('/messages', { method: 'POST', body: JSON.stringify(body) }),

  // Cases & Case Tracking
  getCaseTrackingEligibility: () => request('/cases/eligibility'),
  getMyCases: () => request('/cases'),
  createCase: (body) => request('/cases', { method: 'POST', body: JSON.stringify(body) }),
  updateCase: (id, body) => request(`/cases/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getCaseNotifications: () => request('/cases/notifications'),
  markCaseNotificationRead: (notifId) => request(`/cases/notifications/${notifId}/read`, { method: 'PATCH' }),
  markAllCaseNotificationsRead: () => request('/cases/notifications/read-all', { method: 'PATCH' }),
  uploadCaseDocument: async (caseId, formData) => {
    const token = localStorage.getItem('lawbd_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE}/cases/${caseId}/documents`, {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Document upload failed');
    return data;
  },
  fetchCaseDocumentBlob: async (caseId, docId, inline = false) => {
    const token = localStorage.getItem('lawbd_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(
      `${API_BASE}/cases/${caseId}/documents/${encodeURIComponent(docId)}/download${inline ? '?inline=1' : ''}`,
      { headers }
    );
    if (!res.ok) throw new Error('Failed to retrieve document');
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const blob = await res.blob();
    return { blob, contentType };
  },

  // Admin
  getAdminStats: () => request('/admin/stats'),
  getLawyerApplications: () => request('/admin/lawyer-applications'),
  verifyLawyer: (id, action) => request(`/admin/verify-lawyer/${id}`, { method: 'POST', body: JSON.stringify({ action }) }),
  getUsers: () => request('/admin/users'),
  updateUserStatus: (id, status) => request(`/admin/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getAuditLogs: () => request('/admin/audit-logs'),

  // Content
  getDictionary: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/content/dictionary${query ? `?${query}` : ''}`);
  },
  getEmergencyResources: () => request('/content/emergency'),
  getChecklists: () => request('/content/checklists'),
  getArticles: () => request('/content/articles')
};
