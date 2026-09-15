import { USMLESystem } from './types';

export const usmleSystems: USMLESystem[] = [
  { id: "pathology", name: "Pathology", slug: "pathology", description: "Disease processes and mechanisms", category: "Foundational", defaultEstimatedDays: 5 },
  { id: "biochemistry", name: "Biochemistry", slug: "biochemistry", description: "Metabolism, genetics, and molecular biology", category: "Foundational", defaultEstimatedDays: 20 },
  { id: "immunology", name: "Immunology", slug: "immunology", description: "Immune system and disorders", category: "Foundational", defaultEstimatedDays: 8 },
  { id: "microbiology", name: "Microbiology", slug: "microbiology", description: "Bacteria, viruses, fungi, parasites", category: "Foundational", defaultEstimatedDays: 20 },
  { id: "neuroscience", name: "Neuroscience", slug: "neuroscience", description: "Neuroanatomy and physiology", category: "Organ System", defaultEstimatedDays: 21 },
  { id: "psychiatry", name: "Psychiatry", slug: "psychiatry", description: "Mental health and disorders", category: "Organ System", defaultEstimatedDays: 10 },
  { id: "musculoskeletal", name: "Musculoskeletal", slug: "musculoskeletal", description: "Orthopedics and rheumatology", category: "Organ System", defaultEstimatedDays: 7 },
  { id: "dermatology", name: "Dermatology", slug: "dermatology", description: "Skin disorders", category: "Organ System", defaultEstimatedDays: 3 },
  { id: "cardiovascular", name: "Cardiovascular", slug: "cardiovascular", description: "Heart and vessels", category: "Organ System", defaultEstimatedDays: 21 },
  { id: "hematology", name: "Hematology", slug: "hematology", description: "Blood and oncology", category: "Organ System", defaultEstimatedDays: 10 },
  { id: "renal", name: "Renal", slug: "renal", description: "Kidney and urinary tract", category: "Organ System", defaultEstimatedDays: 9 },
  { id: "endocrine", name: "Endocrine", slug: "endocrine", description: "Hormones and glands", category: "Organ System", defaultEstimatedDays: 10 },
  { id: "gastrointestinal", name: "Gastrointestinal", slug: "gastrointestinal", description: "GI tract and liver", category: "Organ System", defaultEstimatedDays: 12 },
  { id: "reproductive", name: "Reproductive", slug: "reproductive", description: "Male and female systems", category: "Organ System", defaultEstimatedDays: 7 },
  { id: "respiratory", name: "Respiratory", slug: "respiratory", description: "Lungs and airways", category: "Organ System", defaultEstimatedDays: 9 },
  { id: "ethics", name: "Ethics", slug: "ethics", description: "Medical ethics and legal", category: "Behavioral", defaultEstimatedDays: 4 },
  { id: "biostatistics", name: "Biostatistics", slug: "biostatistics", description: "Epidemiology and stats", category: "Behavioral", defaultEstimatedDays: 5 },
  { id: "pharmacology", name: "General Pharmacology", slug: "pharmacology", description: "Principles and autonomics", category: "Foundational", defaultEstimatedDays: 5 },
];