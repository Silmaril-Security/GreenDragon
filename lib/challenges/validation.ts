import type { Challenge } from "@/lib/db/schema";

export type ValidationResult = {
  success: boolean;
  matchedText?: string;
};

export function validateResponse(
  response: string,
  challenge: Challenge,
  toolOutputs?: string[]
): ValidationResult {
  // Combine response with tool outputs for validation
  const combinedText = toolOutputs
    ? [response, ...toolOutputs].join("\n")
    : response;

  switch (challenge.successType) {
    case "response_contains":
      return validateContains(combinedText, challenge.successValue);
    case "response_regex":
      return validateRegex(combinedText, challenge.successValue);
    case "custom":
      return validateCustom(combinedText, challenge.successValue);
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
    // Limit response length to prevent ReDoS on very long inputs
    const truncatedResponse = response.slice(0, 50000);
    const regex = new RegExp(pattern, "i");
    const match = truncatedResponse.match(regex);
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
