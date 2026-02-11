/**
 * Network Status Utility
 * Provides comprehensive network connectivity detection and management
 */

export class NetworkStatus {
  private static instance: NetworkStatus;
  private listeners: Set<(online: boolean) => void> = new Set();
  private isOnlineStatus: boolean = navigator.onLine;

  private constructor() {
    this.setupListeners();
  }

  static getInstance(): NetworkStatus {
    if (!NetworkStatus.instance) {
      NetworkStatus.instance = new NetworkStatus();
    }
    return NetworkStatus.instance;
  }

  private setupListeners() {
    window.addEventListener('online', () => {
      console.log('🌐 Network: Online');
      this.isOnlineStatus = true;
      this.notifyListeners(true);
    });

    window.addEventListener('offline', () => {
      console.log('📡 Network: Offline');
      this.isOnlineStatus = false;
      this.notifyListeners(false);
    });

    // Additional check using fetch (more reliable)
    this.periodicCheck();
  }

  private notifyListeners(online: boolean) {
    this.listeners.forEach(listener => {
      try {
        listener(online);
      } catch (error) {
        console.error('Error in network listener:', error);
      }
    });
  }

  // Periodic connectivity check
  private periodicCheck() {
    setInterval(async () => {
      const online = await this.checkConnectivity();
      if (online !== this.isOnlineStatus) {
        this.isOnlineStatus = online;
        this.notifyListeners(online);
      }
    }, 30000); // Check every 30 seconds
  }

  // Check actual connectivity (not just network interface status)
  async checkConnectivity(): Promise<boolean> {
    if (!navigator.onLine) {
      return false;
    }

    try {
      // Try to fetch a small resource with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/manifest.json', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }

  isOnline(): boolean {
    return this.isOnlineStatus;
  }

  subscribe(listener: (online: boolean) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Get connection type (if supported)
  getConnectionType(): string {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'unknown';
    }
    
    return 'unknown';
  }

  // Check if connection is slow
  isSlowConnection(): boolean {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      const slowTypes = ['slow-2g', '2g'];
      return slowTypes.includes(connection.effectiveType);
    }
    
    return false;
  }
}

export const networkStatus = NetworkStatus.getInstance();
