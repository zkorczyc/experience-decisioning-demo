import { Persona, Vertical } from "./types";

function formatAge(optionId: string): string {
  const years = optionId.replace("age_", "").replace("s", "");
  return `${years} years old`;
}

export function shortCollectionLabel(collectionName: string, brand: string): string {
  return collectionName
    .replace(new RegExp(`^${brand}\\s+`), "")
    .replace(/\s+Offers$/, "");
}

export function buildProfileSummary(
  persona: Persona,
  paramSelections: Record<string, string>,
  vertical: Vertical,
  activeSignals?: Set<string>
): string[] {
  const parts: string[] = [];

  for (const param of persona.parameterDefs) {
    const optionId = paramSelections[param.id];
    const option = param.options.find((o) => o.id === optionId);
    if (!option) continue;

    switch (param.id) {
      case "age":
        parts.push(formatAge(option.id));
        break;
      case "customer_status":
        parts.push(option.id === "customer_existing" ? `${vertical.brand} Customer` : "Prospect");
        break;
      case "profession":
        parts.push(`Profession: ${option.label}`);
        break;
      case "sentiment":
        parts.push(`Sentiment: ${option.id === "sentiment_dissatisfied" ? "😟" : "😊"}`);
        break;
      default:
        parts.push(option.label);
    }
  }

  if (activeSignals) {
    for (const event of persona.eventDefs) {
      if (activeSignals.has(event.signal)) {
        parts.push(event.label);
      }
    }
  }

  return parts;
}

export function buildProfileSentence(
  persona: Persona,
  paramSelections: Record<string, string>,
  vertical: Vertical
): string {
  const parts: string[] = [];
  const ageOption = persona.parameterDefs
    .find((p) => p.id === "age")
    ?.options.find((o) => o.id === paramSelections.age);
  if (ageOption) parts.push(formatAge(ageOption.id));

  const hasCustomerStatus = persona.parameterDefs.some((p) => p.id === "customer_status");
  const isProspect = paramSelections.customer_status === "customer_prospect";
  if (hasCustomerStatus) {
    parts.push(isProspect ? "Prospect" : `${vertical.brand} Customer`);
  }

  const isDissatisfied = paramSelections.sentiment === "sentiment_dissatisfied";
  parts.push(isDissatisfied ? "Dissatisfied" : "Satisfied");

  const professionOption = persona.parameterDefs
    .find((p) => p.id === "profession")
    ?.options.find((o) => o.id === paramSelections.profession);
  if (professionOption) parts.push(`Profession: ${professionOption.label}`);

  return parts.join(", ");
}

export function isKnownExistingCustomer(persona: Persona, paramSelections: Record<string, string>): boolean {
  const hasCustomerStatus = persona.parameterDefs.some((p) => p.id === "customer_status");
  return hasCustomerStatus && paramSelections.customer_status === "customer_existing";
}

export function personalizedOfferTitle(
  title: string,
  persona: Persona,
  paramSelections: Record<string, string>
): string {
  if (!isKnownExistingCustomer(persona, paramSelections)) return title;
  const firstName = persona.name.split(" ")[0];
  return `${firstName}, ${title}`;
}

