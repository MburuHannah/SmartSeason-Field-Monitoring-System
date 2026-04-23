export interface Agent {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  unit: string;
  isFirstLogin: boolean;
  createdDate: string;
}

export interface Field {
  id: string;
  name: string;
  cropType: string;
  plantingDate: string;
  currentStage: "Planted" | "Growing" | "Ready" | "Harvested";
  assignedAgentId: string;
  location: string;
  area: string;
}

export interface FieldUpdate {
  id: string;
  fieldId: string;
  date: string;
  stage: "Planted" | "Growing" | "Ready" | "Harvested";
  notes: string;
  updatedBy: string;
}

export type FieldStatus = "active" | "at-risk" | "completed";

// Compute field status based on logic
export function computeFieldStatus(field: Field, updates: FieldUpdate[]): FieldStatus {
  // Completed: if stage is Harvested
  if (field.currentStage === "Harvested") {
    return "completed";
  }

  // At Risk: if notes contain risk keywords or no recent updates
  const riskKeywords = ["pest", "disease", "dry", "poor growth", "drought", "infected", "dying"];
  const fieldUpdates = updates.filter((u) => u.fieldId === field.id);

  // Check for risk keywords in recent notes
  const hasRiskInNotes = fieldUpdates.some((update) =>
    riskKeywords.some((keyword) => update.notes.toLowerCase().includes(keyword))
  );

  if (hasRiskInNotes) {
    return "at-risk";
  }

  // Check for recent updates (within last 14 days)
  if (fieldUpdates.length > 0) {
    const mostRecentUpdate = fieldUpdates.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    const daysSinceUpdate = Math.floor(
      (new Date().getTime() - new Date(mostRecentUpdate.date).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceUpdate > 14) {
      return "at-risk";
    }
  } else {
    // No updates at all
    return "at-risk";
  }

  // Active: all other cases
  return "active";
}

export const agents: Agent[] = [
  {
    id: "1",
    username: "jsmith",
    password: "password123",
    fullName: "John Smith",
    email: "john.smith@smartseason.com",
    phone: "+1-555-0101",
    unit: "North Unit",
    isFirstLogin: false,
    createdDate: "2026-01-15",
  },
  {
    id: "2",
    username: "sjohnson",
    password: "defaultpass",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@smartseason.com",
    phone: "+1-555-0102",
    unit: "South Unit",
    isFirstLogin: true,
    createdDate: "2026-02-20",
  },
  {
    id: "3",
    username: "mdavis",
    password: "password123",
    fullName: "Mike Davis",
    email: "mike.davis@smartseason.com",
    phone: "+1-555-0103",
    unit: "East Unit",
    isFirstLogin: false,
    createdDate: "2026-01-20",
  },
];

export const fields: Field[] = [
  {
    id: "1",
    name: "North Field A",
    cropType: "Maize",
    plantingDate: "2026-03-15",
    currentStage: "Growing",
    assignedAgentId: "1",
    location: "North Sector",
    area: "25 acres",
  },
  {
    id: "2",
    name: "South Field B",
    cropType: "Wheat",
    plantingDate: "2026-02-20",
    currentStage: "Growing",
    assignedAgentId: "2",
    location: "South Sector",
    area: "30 acres",
  },
  {
    id: "3",
    name: "East Field C",
    cropType: "Soybeans",
    plantingDate: "2026-01-10",
    currentStage: "Harvested",
    assignedAgentId: "3",
    location: "East Sector",
    area: "20 acres",
  },
  {
    id: "4",
    name: "West Field D",
    cropType: "Rice",
    plantingDate: "2026-04-01",
    currentStage: "Planted",
    assignedAgentId: "1",
    location: "West Sector",
    area: "15 acres",
  },
  {
    id: "5",
    name: "Central Field E",
    cropType: "Tomatoes",
    plantingDate: "2026-03-20",
    currentStage: "Growing",
    assignedAgentId: "2",
    location: "Central Sector",
    area: "22 acres",
  },
];

export const fieldUpdates: FieldUpdate[] = [
  {
    id: "1",
    fieldId: "1",
    date: "2026-04-20",
    stage: "Growing",
    notes: "Healthy growth observed, irrigation on schedule",
    updatedBy: "John Smith",
  },
  {
    id: "2",
    fieldId: "2",
    date: "2026-04-19",
    stage: "Growing",
    notes: "Field showing signs of pest infestation. Immediate attention needed.",
    updatedBy: "Sarah Johnson",
  },
  {
    id: "3",
    fieldId: "1",
    date: "2026-04-15",
    stage: "Growing",
    notes: "All plants emerged successfully, no issues",
    updatedBy: "John Smith",
  },
  {
    id: "4",
    fieldId: "3",
    date: "2026-04-18",
    stage: "Harvested",
    notes: "Harvest completed, yield meeting expectations",
    updatedBy: "Mike Davis",
  },
  {
    id: "5",
    fieldId: "4",
    date: "2026-04-21",
    stage: "Planted",
    notes: "Seeds planted successfully, 85% emergence rate",
    updatedBy: "John Smith",
  },
  {
    id: "6",
    fieldId: "5",
    date: "2026-03-25",
    stage: "Planted",
    notes: "Planting completed",
    updatedBy: "Sarah Johnson",
  },
];

export const cropStages: Array<"Planted" | "Growing" | "Ready" | "Harvested"> = [
  "Planted",
  "Growing",
  "Ready",
  "Harvested",
];

// Mock admin user
export const adminUser = {
  username: "admin",
  password: "admin123",
  fullName: "Admin User",
  role: "admin",
};
