export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    cropComparison: 'Crop Comparison',
    marketPrices: 'Market Prices',
    farmingTips: 'Farming Tips',
    diseaseGuide: 'Disease & Pest Guide',
    tutorials: 'Tutorials',
    profile: 'Profile',
    settings: 'Settings',
    
    // Common
    welcome: 'Welcome',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    download: 'Download',
    share: 'Share',
    loading: 'Loading',
    
    // Dashboard
    farmDataInput: 'Farm Data Input',
    generateReport: 'Generate Report',
    viewReports: 'View Reports',
    totalLandSize: 'Total Land Size',
    totalCost: 'Total Cost',
    totalRevenue: 'Total Revenue',
    totalProfit: 'Total Profit',
    
    // Crops
    cropName: 'Crop Name',
    landSize: 'Land Size',
    expectedYield: 'Expected Yield',
    costOfProduction: 'Cost of Production',
    sellingPrice: 'Selling Price',
    season: 'Season',
    location: 'Location',
    
    // Profile
    farmName: 'Farm Name',
    farmLocation: 'Farm Location',
    farmSize: 'Farm Size',
    phoneNumber: 'Phone Number',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    feedback: 'Feedback',
    
    // Other
    recommendations: 'Recommendations',
    securityNotice: 'Security Notice',
    autoLogoutMessage: 'For your protection, you will be automatically logged out when you close this tab or browser.',
  },
  lg: {
    // Navigation (Luganda)
    dashboard: 'Omubala',
    calendar: 'Kalenda',
    cropComparison: 'Okugerageranya Ebirime',
    marketPrices: 'Ebbeeyi z\'Omukatale',
    farmingTips: 'Amagezi ku Kulima',
    diseaseGuide: 'Ekirabo ky\'Endwadde n\'Ebiwuka',
    tutorials: 'Ebisomo',
    profile: 'Ebikwata ku Ggwe',
    settings: 'Enteekateeka',
    
    // Common
    welcome: 'Tukusanyuseemu',
    logout: 'Fuluma',
    save: 'Tereka',
    cancel: 'Sazaamu',
    delete: 'Gyawo',
    edit: 'Kyusa',
    search: 'Noonya',
    filter: 'Londa',
    export: 'Fulumya',
    download: 'Wanula',
    share: 'Gabana',
    loading: 'Kiteekebwa',
    
    // Dashboard
    farmDataInput: 'Okuyingiza Ebikwata ku Kirima',
    generateReport: 'Kola Lipoota',
    viewReports: 'Laba Lipoota',
    totalLandSize: 'Obunene bw\'Ettaka Okutwalira awamu',
    totalCost: 'Ensaasaanya Zonna',
    totalRevenue: 'Ensimbi Eziyingira Zonna',
    totalProfit: 'Amagoba Gonna',
    
    // Crops
    cropName: 'Erinnya ly\'Ekirime',
    landSize: 'Obunene bw\'Ettaka',
    expectedYield: 'Amakungula Agasuubirwa',
    costOfProduction: 'Ensaasaanya mu Kulima',
    sellingPrice: 'Ebbeeyi ey\'Okutunda',
    season: 'Ekiseera',
    location: 'Ekifo',
    
    // Profile
    farmName: 'Erinnya ly\'Ekirima',
    farmLocation: 'Ekifo ky\'Ekirima',
    farmSize: 'Obunene bw\'Ekirima',
    phoneNumber: 'Namba y\'Essimu',
    language: 'Olulimi',
    darkMode: 'Ekizikiza',
    lightMode: 'Ekitangaala',
    feedback: 'Endowooza',
    
    // Other
    recommendations: 'Ebiragiro',
    securityNotice: 'Okukuuma',
    autoLogoutMessage: 'Okukuuma obwesigwa bwo, ojja kufuluma mu ngeri ya otomatiki nga ggalawo omuko oba browser.',
  },
  sw: {
    // Navigation (Swahili)
    dashboard: 'Dashibodi',
    calendar: 'Kalenda',
    cropComparison: 'Ulinganishi wa Mazao',
    marketPrices: 'Bei za Sokoni',
    farmingTips: 'Vidokezo vya Kilimo',
    diseaseGuide: 'Mwongozo wa Magonjwa na Wadudu',
    tutorials: 'Mafunzo',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    
    // Common
    welcome: 'Karibu',
    logout: 'Toka',
    save: 'Hifadhi',
    cancel: 'Ghairi',
    delete: 'Futa',
    edit: 'Hariri',
    search: 'Tafuta',
    filter: 'Chuja',
    export: 'Hamisha',
    download: 'Pakua',
    share: 'Shiriki',
    loading: 'Inapakia',
    
    // Dashboard
    farmDataInput: 'Ingizo la Data ya Shamba',
    generateReport: 'Tengeneza Ripoti',
    viewReports: 'Tazama Ripoti',
    totalLandSize: 'Ukubwa wa Ardhi Jumla',
    totalCost: 'Gharama Jumla',
    totalRevenue: 'Mapato Jumla',
    totalProfit: 'Faida Jumla',
    
    // Crops
    cropName: 'Jina la Zao',
    landSize: 'Ukubwa wa Ardhi',
    expectedYield: 'Mavuno Yanayotarajiwa',
    costOfProduction: 'Gharama ya Uzalishaji',
    sellingPrice: 'Bei ya Kuuza',
    season: 'Msimu',
    location: 'Mahali',
    
    // Profile
    farmName: 'Jina la Shamba',
    farmLocation: 'Mahali pa Shamba',
    farmSize: 'Ukubwa wa Shamba',
    phoneNumber: 'Nambari ya Simu',
    language: 'Lugha',
    darkMode: 'Hali ya Giza',
    lightMode: 'Hali ya Mwanga',
    feedback: 'Maoni',
    
    // Other
    recommendations: 'Mapendekezo',
    securityNotice: 'Tangazo la Usalama',
    autoLogoutMessage: 'Kwa ulinzi wako, utaondolewa kiotomatiki unapofunga kichupo hiki au kivinjari.',
  }
}

export type Language = 'en' | 'lg' | 'sw'

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}