/**
 * Demo mode authentication - validates credentials against localStorage
 * Professional authentication system with comprehensive validation
 */

interface DemoUser {
  email: string;
  password: string;
  username: string;
  createdAt: string;
  isEmailVerified: boolean;
}

const DEMO_USERS_KEY = 'farmsight_demo_users';
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 100;

export const demoAuth = {
  // Validate email format
  isValidEmail(email: string): { valid: boolean; error?: string } {
    if (!email || email.trim() === '') {
      return { valid: false, error: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address (e.g., farmer@example.com)' };
    }
    
    // Check for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain && domain.includes('..')) {
      return { valid: false, error: 'Invalid email format - multiple dots in domain' };
    }
    
    return { valid: true };
  },
  
  // Validate password strength
  isValidPassword(password: string): { valid: boolean; error?: string; strength?: string } {
    if (!password || password.trim() === '') {
      return { valid: false, error: 'Password is required' };
    }
    
    if (password.length < MIN_PASSWORD_LENGTH) {
      return { 
        valid: false, 
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` 
      };
    }
    
    if (password.length > MAX_PASSWORD_LENGTH) {
      return { 
        valid: false, 
        error: `Password must not exceed ${MAX_PASSWORD_LENGTH} characters` 
      };
    }
    
    // Check password strength
    let strength = 'weak';
    let strengthScore = 0;
    
    if (password.length >= 8) strengthScore++;
    if (/[a-z]/.test(password)) strengthScore++;
    if (/[A-Z]/.test(password)) strengthScore++;
    if (/[0-9]/.test(password)) strengthScore++;
    if (/[^a-zA-Z0-9]/.test(password)) strengthScore++;
    
    if (strengthScore >= 4) strength = 'strong';
    else if (strengthScore >= 3) strength = 'medium';
    
    return { valid: true, strength };
  },
  
  // Validate username
  isValidUsername(username: string): { valid: boolean; error?: string } {
    if (!username || username.trim() === '') {
      return { valid: false, error: 'Username is required' };
    }
    
    if (username.length < 2) {
      return { valid: false, error: 'Username must be at least 2 characters' };
    }
    
    if (username.length > 50) {
      return { valid: false, error: 'Username must not exceed 50 characters' };
    }
    
    // Allow letters, numbers, underscores, hyphens, and spaces
    if (!/^[a-zA-Z0-9_\- ]+$/.test(username)) {
      return { 
        valid: false, 
        error: 'Username can only contain letters, numbers, spaces, underscores, and hyphens' 
      };
    }
    
    return { valid: true };
  },
  
  // Register a new demo user
  signup(email: string, password: string, username: string): { 
    success: boolean; 
    error?: string;
    passwordStrength?: string;
  } {
    // Validate email
    const emailValidation = this.isValidEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }
    
    // Validate username
    const usernameValidation = this.isValidUsername(username);
    if (!usernameValidation.valid) {
      return { success: false, error: usernameValidation.error };
    }
    
    // Validate password
    const passwordValidation = this.isValidPassword(password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }
    
    const users = this.getAllUsers();
    
    // Check if email already exists (case-insensitive)
    const normalizedEmail = email.toLowerCase().trim();
    if (users.find(u => u.email.toLowerCase() === normalizedEmail)) {
      return { 
        success: false, 
        error: 'This email is already registered. Please log in instead or use a different email.' 
      };
    }
    
    // Check if username already exists (case-insensitive)
    const normalizedUsername = username.toLowerCase().trim();
    if (users.find(u => u.username.toLowerCase() === normalizedUsername)) {
      return { 
        success: false, 
        error: 'This username is already taken. Please choose a different one.' 
      };
    }
    
    // Add new user
    const newUser: DemoUser = {
      email: normalizedEmail,
      password: password, // In production, this would be hashed
      username: username.trim(),
      createdAt: new Date().toISOString(),
      isEmailVerified: true // Auto-verify for demo mode
    };
    
    users.push(newUser);
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
    
    return { 
      success: true, 
      passwordStrength: passwordValidation.strength 
    };
  },
  
  // Login with email and password
  login(email: string, password: string): { 
    success: boolean; 
    username?: string; 
    error?: string;
  } {
    // Validate inputs
    if (!email || email.trim() === '') {
      return { 
        success: false, 
        error: 'Please enter your email address' 
      };
    }
    
    if (!password || password.trim() === '') {
      return { 
        success: false, 
        error: 'Please enter your password' 
      };
    }
    
    const users = this.getAllUsers();
    
    // Find user by email (case-insensitive)
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    
    if (!user) {
      return { 
        success: false, 
        error: 'No account found with this email address. Please check your email or sign up.' 
      };
    }
    
    // Validate password (exact match)
    if (user.password !== password) {
      return { 
        success: false, 
        error: 'Incorrect password. Please try again or use "Forgot Password" if you need help.' 
      };
    }
    
    // Check if email is verified (always true for demo)
    if (!user.isEmailVerified) {
      return {
        success: false,
        error: 'Please verify your email address before logging in.'
      };
    }
    
    return { success: true, username: user.username };
  },
  
  // Check if email exists
  emailExists(email: string): boolean {
    const users = this.getAllUsers();
    const normalizedEmail = email.toLowerCase().trim();
    return users.some(u => u.email.toLowerCase() === normalizedEmail);
  },
  
  // Check if username exists
  usernameExists(username: string): boolean {
    const users = this.getAllUsers();
    const normalizedUsername = username.toLowerCase().trim();
    return users.some(u => u.username.toLowerCase() === normalizedUsername);
  },
  
  // Get user by email
  getUserByEmail(email: string): DemoUser | undefined {
    const users = this.getAllUsers();
    const normalizedEmail = email.toLowerCase().trim();
    return users.find(u => u.email.toLowerCase() === normalizedEmail);
  },
  
  // Update user password (for password reset)
  updatePassword(email: string, newPassword: string): { success: boolean; error?: string } {
    const passwordValidation = this.isValidPassword(newPassword);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }
    
    const users = this.getAllUsers();
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
    
    return { success: true };
  },
  
  // Get all demo users
  getAllUsers(): DemoUser[] {
    const stored = localStorage.getItem(DEMO_USERS_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },
  
  // Get statistics
  getStats(): { totalUsers: number; verifiedUsers: number } {
    const users = this.getAllUsers();
    return {
      totalUsers: users.length,
      verifiedUsers: users.filter(u => u.isEmailVerified).length
    };
  },
  
  // Clear all demo users (for testing)
  clearAll(): void {
    localStorage.removeItem(DEMO_USERS_KEY);
  },
  
  // Export users (for backup)
  exportUsers(): string {
    return JSON.stringify(this.getAllUsers(), null, 2);
  },
  
  // Import users (for restore)
  importUsers(jsonString: string): { success: boolean; error?: string } {
    try {
      const users = JSON.parse(jsonString);
      if (!Array.isArray(users)) {
        return { success: false, error: 'Invalid format: Expected an array' };
      }
      
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }
  }
};
