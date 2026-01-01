// Initialize demo accounts
export function initializeDemoData() {
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 'admin-demo-1',
        email: 'admin@kangan.edu.au',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'student-demo-1',
        email: 'student@kangan.edu.au',
        password: 'student123',
        name: 'Demo Student',
        role: 'student',
        createdAt: '2024-02-01T00:00:00Z'
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
}
