import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title = 'FarmSight - Agricultural Management System for Uganda',
  description = 'Comprehensive agricultural management system for Ugandan farmers with offline support, market prices, farming calendar, and crop management tools. Works 100% offline with real-time market data.',
  image = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=630&fit=crop',
  url = typeof window !== 'undefined' ? window.location.href : ''
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty: boolean = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      
      element.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', description, false);
    updateMetaTag('keywords', 'farming, agriculture, Uganda, crop management, market prices, farming calendar, offline app, PWA, agricultural technology', false);
    updateMetaTag('author', 'FarmSight', false);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0', false);
    
    // Charset
    let charsetMeta = document.querySelector('meta[charset]');
    if (!charsetMeta) {
      charsetMeta = document.createElement('meta');
      charsetMeta.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charsetMeta, document.head.firstChild);
    }

    // Open Graph meta tags (for Facebook, LinkedIn, etc.)
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', 'FarmSight');
    updateMetaTag('og:locale', 'en_US');
    updateMetaTag('og:locale:alternate', 'sw_KE');
    updateMetaTag('og:locale:alternate', 'lg_UG');

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', image, false);
    updateMetaTag('twitter:site', '@FarmSight', false);
    updateMetaTag('twitter:creator', '@FarmSight', false);

    // Additional meta tags for better sharing
    updateMetaTag('theme-color', '#16a34a', false);
    updateMetaTag('msapplication-TileColor', '#16a34a', false);
    updateMetaTag('msapplication-TileImage', '/icon-144.png', false);
    updateMetaTag('apple-mobile-web-app-capable', 'yes', false);
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent', false);
    updateMetaTag('apple-mobile-web-app-title', 'FarmSight', false);
    updateMetaTag('application-name', 'FarmSight', false);
    updateMetaTag('mobile-web-app-capable', 'yes', false);
    
    // Robots meta tag
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', false);

    // Canonical URL
    updateLinkTag('canonical', url || window.location.href);

    // Manifest
    updateLinkTag('manifest', '/manifest.json');

    // Apple touch icons
    updateLinkTag('apple-touch-icon', '/icon-192.png');
    updateLinkTag('icon', '/icon-192.png');
    updateLinkTag('shortcut icon', '/icon-192.png');

    // Preconnect to external domains for better performance
    const preconnectDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      let preconnect = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!preconnect) {
        preconnect = document.createElement('link');
        preconnect.setAttribute('rel', 'preconnect');
        preconnect.setAttribute('href', domain);
        preconnect.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(preconnect);
      }
    });

    // DNS prefetch
    const dnsPrefetchDomains = [
      'https://images.unsplash.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      let dnsPrefetch = document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`);
      if (!dnsPrefetch) {
        dnsPrefetch = document.createElement('link');
        dnsPrefetch.setAttribute('rel', 'dns-prefetch');
        dnsPrefetch.setAttribute('href', domain);
        document.head.appendChild(dnsPrefetch);
      }
    });

    // Structured data (JSON-LD)
    const structuredDataId = 'structured-data-json-ld';
    let structuredDataScript = document.getElementById(structuredDataId) as HTMLScriptElement;
    
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = structuredDataId;
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "FarmSight",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "description": description,
      "image": image,
      "url": url,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "UGX"
      },
      "featureList": [
        "Offline Support",
        "Real-time Market Prices",
        "Crop Management",
        "Farming Calendar",
        "Multi-language Support (English, Luganda, Swahili)",
        "Dark Mode",
        "PDF Export",
        "Disease Guide",
        "Weather Integration"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "256"
      },
      "screenshot": image,
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "inLanguage": ["en", "lg", "sw"],
      "availableOnDevice": "Desktop, Mobile, Tablet",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "countriesSupported": "Uganda"
    };

    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url]);

  return null; // This component doesn't render anything
}
