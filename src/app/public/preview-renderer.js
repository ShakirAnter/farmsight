/**
 * FarmSight Live Preview Renderer
 * Enables real-time rendering for AI assistants and web browsers
 * Optimized for ChatGPT, Claude, and other AI tools
 */

(function() {
  'use strict';

  // Live Preview Manager
  window.FarmSightPreview = {
    version: '2.0',
    ready: false,
    renderTime: null,
    
    // Initialize live preview
    init: function() {
      console.log('🌾 FarmSight Live Preview: Initializing...');
      
      // Hide loader when app is ready
      this.hideLoader();
      
      // Track render time
      this.renderTime = Date.now();
      
      // Expose preview API
      this.exposeAPI();
      
      // Enable screenshot capabilities
      this.enableScreenshot();
      
      // Mark as ready
      this.ready = true;
      
      console.log('✅ FarmSight Live Preview: Ready');
      
      // Notify parent window (for iframe embeds)
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'farmsight-ready',
          timestamp: this.renderTime,
          info: window.FarmSightInfo
        }, '*');
      }
    },
    
    // Hide loading screen
    hideLoader: function() {
      const loader = document.getElementById('preview-loader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('loaded');
          setTimeout(() => loader.remove(), 500);
        }, 800);
      }
    },
    
    // Expose API for external access
    exposeAPI: function() {
      window.FarmSightAPI = {
        getInfo: () => window.FarmSightInfo,
        getVersion: () => this.version,
        isReady: () => this.ready,
        getRenderTime: () => this.renderTime,
        
        // Get current state
        getState: () => ({
          ready: this.ready,
          renderTime: this.renderTime,
          features: window.FarmSightInfo?.features || [],
          languages: window.FarmSightInfo?.languages || [],
          version: this.version
        }),
        
        // Take screenshot
        takeScreenshot: () => this.captureScreenshot(),
        
        // Get page stats
        getStats: () => ({
          loadTime: this.renderTime ? Date.now() - this.renderTime : 0,
          elements: document.querySelectorAll('*').length,
          images: document.querySelectorAll('img').length,
          scripts: document.querySelectorAll('script').length,
          styles: document.querySelectorAll('link[rel="stylesheet"], style').length,
          online: navigator.onLine
        })
      };
      
      console.log('📡 FarmSight API exposed:', window.FarmSightAPI);
    },
    
    // Enable screenshot functionality
    enableScreenshot: function() {
      if (typeof html2canvas !== 'undefined') {
        console.log('📸 Screenshot capability enabled');
      }
    },
    
    // Capture screenshot (basic implementation)
    captureScreenshot: async function() {
      try {
        // Use canvas API for basic screenshot
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const root = document.getElementById('root');
        
        if (!root) return null;
        
        // Get dimensions
        const rect = root.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Note: This is a placeholder - full screenshot requires html2canvas library
        console.log('📸 Screenshot dimensions:', rect.width, 'x', rect.height);
        
        return {
          width: rect.width,
          height: rect.height,
          timestamp: Date.now(),
          message: 'Screenshot metadata captured (image rendering requires html2canvas)'
        };
      } catch (error) {
        console.error('Screenshot error:', error);
        return null;
      }
    }
  };
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.FarmSightPreview.init();
    });
  } else {
    window.FarmSightPreview.init();
  }
  
  // Performance monitoring
  window.addEventListener('load', () => {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('⚡ FarmSight Performance:', {
      loadTime: loadTime + 'ms',
      domReady: (perfData.domContentLoadedEventEnd - perfData.navigationStart) + 'ms',
      resources: performance.getEntriesByType('resource').length
    });
    
    // Send performance data to parent
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'farmsight-performance',
        loadTime: loadTime,
        timestamp: Date.now()
      }, '*');
    }
  });
  
  // Handle visibility changes (for preview tools)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('👁️ FarmSight: Preview hidden');
    } else {
      console.log('👁️ FarmSight: Preview visible');
    }
  });
  
  // Cross-origin messaging for AI assistants
  window.addEventListener('message', (event) => {
    // Handle requests from AI assistants or preview tools
    if (event.data && event.data.type === 'farmsight-request') {
      const response = {
        type: 'farmsight-response',
        request: event.data.action,
        data: null,
        timestamp: Date.now()
      };
      
      switch (event.data.action) {
        case 'getInfo':
          response.data = window.FarmSightInfo;
          break;
        case 'getState':
          response.data = window.FarmSightAPI?.getState();
          break;
        case 'getStats':
          response.data = window.FarmSightAPI?.getStats();
          break;
        case 'screenshot':
          window.FarmSightAPI?.takeScreenshot().then(data => {
            response.data = data;
            event.source.postMessage(response, event.origin);
          });
          return;
        default:
          response.error = 'Unknown action';
      }
      
      event.source.postMessage(response, event.origin);
    }
  });
  
  // Export for debugging
  window.__FARMSIGHT_DEBUG__ = {
    version: '2.0',
    getInfo: () => window.FarmSightInfo,
    getPreview: () => window.FarmSightPreview,
    getAPI: () => window.FarmSightAPI,
    testAPI: () => {
      console.log('🧪 Testing FarmSight API...');
      console.log('Info:', window.FarmSightAPI?.getInfo());
      console.log('State:', window.FarmSightAPI?.getState());
      console.log('Stats:', window.FarmSightAPI?.getStats());
      console.log('✅ API test complete');
    }
  };
  
})();
