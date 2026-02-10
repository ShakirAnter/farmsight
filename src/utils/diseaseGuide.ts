import { DiseaseGuide } from '../types'

export const diseaseGuidesData: DiseaseGuide[] = [
  {
    id: '1',
    name: 'Fall Armyworm',
    cropAffected: ['Maize', 'Rice', 'Sorghum'],
    symptoms: [
      'Holes in leaves with ragged edges',
      'Sawdust-like frass near whorl',
      'Young larvae feed on leaf tissue',
      'Severe defoliation in advanced stages',
      'Damaged tassels and ears'
    ],
    treatment: [
      'Hand-pick and destroy larvae early morning',
      'Apply neem-based biopesticides',
      'Use chemical pesticides: chlorpyrifos or cypermethrin',
      'Release natural enemies like Trichogramma wasps',
      'Apply pesticides directly into whorl'
    ],
    prevention: [
      'Plant early to avoid peak infestation',
      'Use resistant or tolerant maize varieties',
      'Intercrop with beans or cowpeas',
      'Practice crop rotation',
      'Monitor fields regularly for early detection'
    ]
  },
  {
    id: '2',
    name: 'Coffee Wilt Disease (CWD)',
    cropAffected: ['Coffee'],
    symptoms: [
      'Wilting of leaves on one or more branches',
      'Dark streaking in stems when cut',
      'Branch dieback progressing downward',
      'Green berries turning black and drying',
      'Entire plant death within 6 months'
    ],
    treatment: [
      'Remove and burn infected plants immediately',
      'Sterilize pruning tools with fire or disinfectant',
      'Do not replant in the same spot for 2 years',
      'There is no chemical cure for CWD'
    ],
    prevention: [
      'Use certified disease-free seedlings only',
      'Maintain proper plant spacing (2.5m x 2.5m)',
      'Avoid root damage during weeding',
      'Practice good field sanitation',
      'Plant resistant varieties like Erecta'
    ]
  },
  {
    id: '3',
    name: 'Banana Bacterial Wilt (BBW)',
    cropAffected: ['Banana'],
    symptoms: [
      'Premature yellowing and wilting of leaves',
      'Yellow discoloration of male bud',
      'Rotting of fruits from inside',
      'Yellow bacterial ooze from cut stems',
      'Rapid spread to nearby plants'
    ],
    treatment: [
      'Remove entire infected mat including roots',
      'Cut stems into small pieces and bury deep',
      'Sterilize tools between each mat',
      'Establish a quarantine zone around infection'
    ],
    prevention: [
      'Use clean tools sterilized with fire',
      'Remove male buds using a forked stick',
      'Avoid damage to plants during farm operations',
      'Do not allow flower visitors to spread bacteria',
      'Practice crop rotation with non-host crops'
    ]
  },
  {
    id: '4',
    name: 'Cassava Mosaic Disease (CMD)',
    cropAffected: ['Cassava'],
    symptoms: [
      'Yellow and green mottling on leaves',
      'Leaf distortion and curling',
      'Stunted plant growth',
      'Reduced tuber size and quality',
      'Whiteflies on undersides of leaves'
    ],
    treatment: [
      'Remove and destroy severely infected plants',
      'Control whitefly vectors with neem spray',
      'Use resistant varieties as replacement',
      'Rogue out infected plants early'
    ],
    prevention: [
      'Plant resistant varieties (NASE 14, NASE 19)',
      'Use disease-free planting materials',
      'Control whitefly populations',
      'Remove volunteer cassava plants',
      'Maintain proper spacing for air circulation'
    ]
  },
  {
    id: '5',
    name: 'Bean Root Rot',
    cropAffected: ['Beans'],
    symptoms: [
      'Yellowing and wilting of lower leaves',
      'Brown or black lesions on roots',
      'Poor plant vigor and stunting',
      'Root system decay',
      'Plants easily pulled from soil'
    ],
    treatment: [
      'Remove infected plants immediately',
      'Improve soil drainage',
      'Apply fungicides containing metalaxyl',
      'Avoid overhead irrigation'
    ],
    prevention: [
      'Practice crop rotation (3-year cycle)',
      'Plant in well-drained soils',
      'Use certified disease-free seeds',
      'Avoid planting in waterlogged areas',
      'Maintain proper plant spacing'
    ]
  },
  {
    id: '6',
    name: 'Tomato Late Blight',
    cropAffected: ['Tomato', 'Irish Potato'],
    symptoms: [
      'Dark brown lesions on leaves',
      'White fuzzy growth on leaf undersides',
      'Brown spots on fruits',
      'Rapid plant collapse in wet conditions',
      'Characteristic potato smell from infected tissue'
    ],
    treatment: [
      'Apply copper-based fungicides immediately',
      'Use systemic fungicides like metalaxyl',
      'Remove and destroy infected plants',
      'Spray preventively during cool, wet weather'
    ],
    prevention: [
      'Plant resistant varieties',
      'Ensure adequate spacing for air circulation',
      'Avoid overhead irrigation',
      'Apply preventive fungicide sprays',
      'Remove volunteer tomato plants'
    ]
  },
  {
    id: '7',
    name: 'Maize Streak Virus',
    cropAffected: ['Maize'],
    symptoms: [
      'Pale yellow streaks along leaf veins',
      'Stunted plant growth',
      'Reduced ear size or no ear formation',
      'Symptoms worse in younger plants',
      'Leafhoppers present on plants'
    ],
    treatment: [
      'No cure exists once infected',
      'Remove severely infected plants',
      'Control leafhopper populations',
      'Apply insecticides early in season'
    ],
    prevention: [
      'Plant resistant maize varieties',
      'Plant early to avoid peak leafhopper season',
      'Control weeds around field (harbor leafhoppers)',
      'Use insecticide-treated seeds',
      'Monitor for leafhoppers and spray if needed'
    ]
  },
  {
    id: '8',
    name: 'Sweet Potato Weevil',
    cropAffected: ['Sweet Potato'],
    symptoms: [
      'Small holes in stems near soil surface',
      'Dark tunnels in tubers',
      'Bitter taste in damaged tubers',
      'Wilting of vines',
      'Adult weevils visible (dark blue-black with red-orange head)'
    ],
    treatment: [
      'Harvest crop early if infestation detected',
      'Apply insecticides to stem base',
      'Remove and destroy infested tubers',
      'Rotate to non-host crops'
    ],
    prevention: [
      'Use certified disease-free planting materials',
      'Hill up soil around plants to cover stems',
      'Practice crop rotation (2-3 years)',
      'Harvest promptly when mature',
      'Remove all crop debris after harvest'
    ]
  }
]

export function searchDiseaseGuides(query: string): DiseaseGuide[] {
  const lowerQuery = query.toLowerCase()
  return diseaseGuidesData.filter(guide =>
    guide.name.toLowerCase().includes(lowerQuery) ||
    guide.cropAffected.some(crop => crop.toLowerCase().includes(lowerQuery)) ||
    guide.symptoms.some(symptom => symptom.toLowerCase().includes(lowerQuery))
  )
}

export function getGuidesByCrop(cropName: string): DiseaseGuide[] {
  return diseaseGuidesData.filter(guide =>
    guide.cropAffected.some(crop => crop.toLowerCase() === cropName.toLowerCase())
  )
}
