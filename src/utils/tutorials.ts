export interface Tutorial {
  id: string
  title: string
  category: 'getting-started' | 'planting' | 'maintenance' | 'harvesting' | 'marketing'
  description: string
  steps: {
    title: string
    description: string
    tips?: string[]
  }[]
  cropSpecific?: string
  duration: string
}

export const tutorialsData: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with Maize Farming',
    category: 'getting-started',
    description: 'Complete guide to starting maize cultivation in Uganda from land preparation to planting.',
    cropSpecific: 'Maize',
    duration: '2-3 weeks',
    steps: [
      {
        title: 'Land Selection and Preparation',
        description: 'Choose well-drained land with good access to sunlight. Clear the field of weeds and debris.',
        tips: [
          'Test soil pH (ideal: 5.5-7.0)',
          'Plough the land 2-3 weeks before planting',
          'Create furrows 75cm apart'
        ]
      },
      {
        title: 'Seed Selection',
        description: 'Purchase certified maize seeds from authorized dealers. Choose varieties suited to your area.',
        tips: [
          'Longe varieties: Longe 5, Longe 10H',
          'Hybrid varieties: SC627, Pioneer',
          'Check seed packet for planting rates'
        ]
      },
      {
        title: 'Planting',
        description: 'Plant at the start of the rainy season. Plant 2-3 seeds per hole at 2-3cm depth.',
        tips: [
          'Space plants 30cm apart within rows',
          'Rows should be 75cm apart',
          'Plant early morning or late afternoon',
          'Cover seeds lightly with soil'
        ]
      },
      {
        title: 'Apply Basal Fertilizer',
        description: 'Apply fertilizer (DAP or NPK) at planting time in bands 5cm from seeds.',
        tips: [
          'Use 1 bag (50kg) of DAP per acre',
          'Mix with soil to avoid seed burn',
          'Can use manure as alternative (5-10 tons/acre)'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Organic Compost Making',
    category: 'maintenance',
    description: 'Learn how to make quality compost from farm and household waste.',
    duration: '2-3 months',
    steps: [
      {
        title: 'Collect Materials',
        description: 'Gather green materials (fresh grass, kitchen waste) and brown materials (dry leaves, straw).',
        tips: [
          'Green:Brown ratio should be 1:2',
          'Avoid diseased plant materials',
          'Chop materials into small pieces'
        ]
      },
      {
        title: 'Build the Pile',
        description: 'Create layers alternating green and brown materials. Add animal manure if available.',
        tips: [
          'Make pile at least 1m x 1m x 1m',
          'Locate in shaded area',
          'Ensure good drainage beneath'
        ]
      },
      {
        title: 'Maintain the Pile',
        description: 'Turn the pile weekly to aerate. Keep moist like a wrung-out sponge.',
        tips: [
          'Temperature should reach 60-70°C',
          'Add water if too dry',
          'Add dry materials if too wet'
        ]
      },
      {
        title: 'Harvesting Compost',
        description: 'Compost is ready when dark, crumbly, and earthy-smelling (2-3 months).',
        tips: [
          'Sieve to remove large particles',
          'Store in dry place if not using immediately',
          'Apply 2-3 tons per acre'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Coffee Nursery Management',
    category: 'planting',
    description: 'Step-by-step guide to establishing and managing a coffee nursery.',
    cropSpecific: 'Coffee',
    duration: '6-8 months',
    steps: [
      {
        title: 'Site Selection',
        description: 'Choose a site with shade, close to water source, and protected from strong winds.',
        tips: [
          'Partial shade (50%) is ideal',
          'Flat or gently sloping land',
          'Good drainage essential'
        ]
      },
      {
        title: 'Prepare Potting Soil',
        description: 'Mix topsoil, manure, and sand in ratio 3:2:1. Sterilize to kill diseases.',
        tips: [
          'Steam or sun-dry soil to sterilize',
          'Ensure soil is not too acidic',
          'Screen to remove stones and debris'
        ]
      },
      {
        title: 'Seed Selection and Sowing',
        description: 'Use fresh berries from healthy, productive trees. Remove pulp and sow immediately.',
        tips: [
          'Plant 2 seeds per pot (flat side down)',
          'Cover with 1cm of soil',
          'Water gently daily',
          'Germination takes 6-8 weeks'
        ]
      },
      {
        title: 'Seedling Care',
        description: 'Water daily, weed regularly, and protect from pests. Thin to one seedling per pot.',
        tips: [
          'Gradually reduce shade after 3 months',
          'Apply foliar fertilizer monthly',
          'Transplant to field at 6-8 months',
          'Harden seedlings 2 weeks before transplanting'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Proper Bean Harvesting and Storage',
    category: 'harvesting',
    description: 'Learn when and how to harvest beans and store them properly to prevent losses.',
    cropSpecific: 'Beans',
    duration: '1 week',
    steps: [
      {
        title: 'Identify Harvest Time',
        description: 'Beans are ready when 90% of pods are dry and seeds rattle inside.',
        tips: [
          'Usually 90-120 days after planting',
          'Leaves should be yellowing and dropping',
          'Pods turn brown or yellow depending on variety'
        ]
      },
      {
        title: 'Harvesting',
        description: 'Harvest on a sunny day when plants are dry to prevent mold.',
        tips: [
          'Uproot entire plants or pick pods',
          'Avoid harvesting when plants are wet',
          'Handle gently to avoid seed damage',
          'Harvest in the morning after dew dries'
        ]
      },
      {
        title: 'Drying',
        description: 'Spread beans thinly on clean tarpaulin in sun. Dry to 12-13% moisture.',
        tips: [
          'Turn beans frequently for even drying',
          'Protect from rain and dew at night',
          'Drying takes 3-5 days in good weather',
          'Test: Bite a bean - should crack, not dent'
        ]
      },
      {
        title: 'Storage',
        description: 'Store in hermetic bags or clean containers with tight lids.',
        tips: [
          'Use PICS bags or metal silos',
          'Add ash or botanical pesticides if using sacks',
          'Store in cool, dry place',
          'Check monthly for pests and moisture'
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Marketing Your Farm Produce',
    category: 'marketing',
    description: 'Strategies to get better prices for your crops and find reliable buyers.',
    duration: 'Ongoing',
    steps: [
      {
        title: 'Market Research',
        description: 'Identify different markets and compare prices before selling.',
        tips: [
          'Visit multiple markets to compare prices',
          'Check online platforms for price information',
          'Join farmer groups for collective marketing',
          'Understand seasonal price variations'
        ]
      },
      {
        title: 'Value Addition',
        description: 'Process crops to increase value: shelling maize, grading beans, etc.',
        tips: [
          'Clean and grade produce by size/quality',
          'Package attractively in labeled bags',
          'Consider processing (flour, dried fruits)',
          'Certification can command premium prices'
        ]
      },
      {
        title: 'Build Buyer Relationships',
        description: 'Establish long-term relationships with reliable buyers.',
        tips: [
          'Supply consistently and on time',
          'Maintain quality standards',
          'Keep buyers updated on production',
          'Negotiate contracts before planting'
        ]
      },
      {
        title: 'Record Keeping',
        description: 'Track sales, expenses, and buyer information for better planning.',
        tips: [
          'Record quantities sold and prices received',
          'Note buyer contacts and preferences',
          'Calculate profits per crop',
          'Use records to plan next season'
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Drip Irrigation Setup for Small Farms',
    category: 'maintenance',
    description: 'Install and maintain a simple drip irrigation system for water efficiency.',
    duration: '1-2 days',
    steps: [
      {
        title: 'System Planning',
        description: 'Measure your field and calculate water needs for your crops.',
        tips: [
          'Map out crop rows and water source location',
          'Calculate total drip line needed',
          'Consider gravity-fed vs pump system',
          'Budget for tank, pipes, drippers, and fittings'
        ]
      },
      {
        title: 'Installation',
        description: 'Set up water tank, main line, and drip lines along crop rows.',
        tips: [
          'Elevate tank 1-2m above field for pressure',
          'Use filters to prevent dripper clogging',
          'Lay drip lines along crop rows',
          'Secure with pegs or soil'
        ]
      },
      {
        title: 'Operation',
        description: 'Water early morning or evening. Adjust frequency based on crop needs.',
        tips: [
          'Irrigate 1-2 hours daily or as needed',
          'Check soil moisture regularly',
          'Reduce watering during rainy periods',
          'Monitor for even water distribution'
        ]
      },
      {
        title: 'Maintenance',
        description: 'Regularly clean filters and check for leaks or blockages.',
        tips: [
          'Flush system weekly',
          'Clean filters after every use',
          'Replace damaged drippers',
          'Store system properly during off-season'
        ]
      }
    ]
  }
]

export function searchTutorials(query: string): Tutorial[] {
  const lowerQuery = query.toLowerCase()
  return tutorialsData.filter(tutorial =>
    tutorial.title.toLowerCase().includes(lowerQuery) ||
    tutorial.description.toLowerCase().includes(lowerQuery) ||
    (tutorial.cropSpecific && tutorial.cropSpecific.toLowerCase().includes(lowerQuery))
  )
}

export function getTutorialsByCategory(category: Tutorial['category']): Tutorial[] {
  return tutorialsData.filter(tutorial => tutorial.category === category)
}

export function getTutorialsByCrop(cropName: string): Tutorial[] {
  return tutorialsData.filter(tutorial =>
    tutorial.cropSpecific?.toLowerCase() === cropName.toLowerCase()
  )
}
