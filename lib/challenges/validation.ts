import type { Challenge } from "@/lib/db/schema";

export type ValidationResult = {
  success: boolean;
  matchedText?: string;
};

export function validateResponse(
  response: string,
  challenge: Challenge
): ValidationResult {
  switch (challenge.successType) {
    case "response_contains":
      return validateContains(response, challenge.successValue);
    case "response_regex":
      return validateRegex(response, challenge.successValue);
    case "custom":
      return validateCustom(response, challenge.successValue);
    default:
      return { success: false };
  }
}

function validateContains(response: string, value: string): ValidationResult {
  const lowerResponse = response.toLowerCase();
  const lowerValue = value.toLowerCase();
  const success = lowerResponse.includes(lowerValue);
  return { success, matchedText: success ? value : undefined };
}

function validateRegex(response: string, pattern: string): ValidationResult {
  try {
    const regex = new RegExp(pattern, "i");
    const match = response.match(regex);
    return { success: !!match, matchedText: match?.[0] };
  } catch {
    // Invalid regex pattern
    return { success: false };
  }
}

function validateCustom(
  _response: string,
  _validatorName: string
): ValidationResult {
  // Placeholder for custom validators
  return { success: false };
}
