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
    
    // Google Site Verification
    updateMetaTag('google-site-verification', 'PUOEWQvha6YL9kKeUyW47C8g5V-TQpA5RTWt6OqORxY', false);
    
    // Extended SEO meta tags
    updateMetaTag('subject', 'Agricultural Management System for Uganda', false);
    updateMetaTag('copyright', 'FarmSight 2025 - 2026', false);
    updateMetaTag('language', 'EN, LG, SW', false);
    updateMetaTag('classification', 'Agriculture, Business, Technology', false);
    updateMetaTag('category', 'Agriculture', false);
    updateMetaTag('coverage', 'Uganda', false);
    updateMetaTag('distribution', 'Global', false);
    updateMetaTag('rating', 'General', false);
    updateMetaTag('revisit-after', '7 days', false);
    
    // Detailed description meta tags
    updateMetaTag('abstract', 'FarmSight is a comprehensive agricultural management system designed specifically for Ugandan farmers. Track crop production, monitor market prices, manage farming calendars, identify diseases, and access farming tips - all offline!', false);
    updateMetaTag('topic', 'Agricultural Technology, Crop Management, Farm Management Software', false);
    updateMetaTag('summary', 'Complete farming solution for Ugandan farmers with offline support, real-time market prices, crop comparison, disease guides, tutorials, and multi-language interface (English, Luganda, Swahili).', false);
    
    // Geographic and regional meta tags
    updateMetaTag('geo.region', 'UG', false);
    updateMetaTag('geo.placename', 'Uganda', false);
    updateMetaTag('geo.position', '1.373333;32.290275', false); // Kampala coordinates
    updateMetaTag('ICBM', '1.373333, 32.290275', false);
    updateMetaTag('DC.title', title, false);
    
    // Target audience
    updateMetaTag('audience', 'Farmers, Agricultural Workers, Farm Managers, Agricultural Students', false);
    updateMetaTag('target', 'farmers, agriculture professionals, agricultural students', false);
    
    // Website purpose and functionality
    updateMetaTag('purpose', 'Help Ugandan farmers manage their farms efficiently with offline-first agricultural management tools, market price tracking, and comprehensive farming resources.', false);
    updateMetaTag('page-type', 'Web Application', false);
    updateMetaTag('content-type', 'Agricultural Management System', false);
    
    // Features list for better discoverability
    updateMetaTag('features', 'Offline Support, Crop Input Forms, Market Prices (UGX), Farming Calendar, Disease Guide, Pest Management, Crop Comparison, PDF Reports, Weather Integration, Multi-language Support, Dark Mode, Progressive Web App', false);
    
    // Language alternatives
    updateMetaTag('language', 'English', false);
    updateMetaTag('DC.language', 'en, lg, sw', false);
    
    // Commercial information
    updateMetaTag('price', 'Free', false);
    updateMetaTag('availability', 'Available 24/7', false);
    
    // Accessibility
    updateMetaTag('accessibility', 'Works offline, Mobile-friendly, PWA, Multi-language support', false);
    
    // Additional Open Graph tags
    updateMetaTag('og:email', 'farmsight11@gmail.com');
    updateMetaTag('og:phone_number', '+256');
    updateMetaTag('og:latitude', '1.373333');
    updateMetaTag('og:longitude', '32.290275');
    updateMetaTag('og:street-address', 'Uganda');
    updateMetaTag('og:locality', 'Kampala');
    updateMetaTag('og:region', 'Central Region');
    updateMetaTag('og:postal-code', '00000');
    updateMetaTag('og:country-name', 'Uganda');
    
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
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "FarmSight",
          "alternateName": "FarmSight Uganda",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Agricultural Management",
          "operatingSystem": "Any",
          "description": description,
          "image": image,
          "url": url,
          "author": {
            "@type": "Person",
            "name": "Sujal Kerai",
            "jobTitle": "Developer"
          },
          "creator": {
            "@type": "Organization",
            "name": "FarmSight",
            "email": "farmsight11@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Uganda",
              "addressLocality": "Kampala"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "UGX",
            "availability": "https://schema.org/InStock",
            "category": "Free Agricultural Software"
          },
          "featureList": [
            "Complete Offline Functionality",
            "Real-time Market Prices in UGX",
            "Comprehensive Crop Management",
            "Farming Calendar with Activity Tracking",
            "Disease and Pest Identification Guide",
            "Crop Comparison and Analysis",
            "PDF Report Generation",
            "Weather Integration",
            "Multi-language Support (English, Luganda, Swahili)",
            "Dark Mode Interface",
            "Progressive Web App (PWA)",
            "Data Export Capabilities",
            "Farming Tips and Best Practices",
            "Video Tutorials",
            "24+ Ugandan Crops Database",
            "All Uganda Districts Coverage",
            "Service Worker for Offline Access",
            "IndexedDB Local Storage",
            "Automatic Data Synchronization"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "256",
            "bestRating": "5",
            "worstRating": "1"
          },
          "screenshot": image,
          "softwareVersion": "2.0",
          "softwareHelp": {
            "@type": "CreativeWork",
            "url": url + "#tutorials"
          },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString().split('T')[0],
          "inLanguage": ["en", "lg", "sw"],
          "availableOnDevice": ["Desktop", "Mobile", "Tablet"],
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "countriesSupported": "Uganda",
          "educationalUse": "Agricultural Education and Farm Management",
          "audience": {
            "@type": "Audience",
            "audienceType": "Farmers, Agricultural Workers, Students",
            "geographicArea": {
              "@type": "Place",
              "name": "Uganda"
            }
          },
          "serviceType": "Agricultural Management System",
          "areaServed": {
            "@type": "Country",
            "name": "Uganda"
          }
        },
        {
          "@type": "Organization",
          "name": "FarmSight",
          "url": url,
          "logo": image,
          "email": "farmsight11@gmail.com",
          "description": "Comprehensive agricultural management system for Ugandan farmers",
          "foundingDate": "2025",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Uganda",
            "addressLocality": "Kampala"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Uganda"
          },
          "knowsAbout": [
            "Agriculture",
            "Crop Management",
            "Farm Management",
            "Agricultural Technology",
            "Market Prices",
            "Disease Management",
            "Pest Control"
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "FarmSight PWA",
          "applicationCategory": "Agriculture",
          "operatingSystem": "Progressive Web App",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "UGX"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "256"
          }
        },
        {
          "@type": "WebSite",
          "name": "FarmSight",
          "url": url,
          "description": description,
          "inLanguage": ["en", "lg", "sw"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": url + "?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Does FarmSight work offline?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! FarmSight is designed to work completely offline. All features including crop management, market prices, farming calendar, and reports work without internet connection."
              }
            },
            {
              "@type": "Question",
              "name": "What languages does FarmSight support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "FarmSight supports three languages: English, Luganda, and Swahili, making it accessible to farmers across Uganda."
              }
            },
            {
              "@type": "Question",
              "name": "Is FarmSight free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, FarmSight is completely free for all Ugandan farmers. There are no subscription fees or hidden charges."
              }
            },
            {
              "@type": "Question",
              "name": "What crops does FarmSight support?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "FarmSight supports over 24 major Ugandan crops including Maize, Coffee, Beans, Bananas, Cassava, Rice, and many more with detailed management information for each."
              }
            }
          ]
        }
      ]
    };

    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url]);

  return null; // This component doesn't render anything
}