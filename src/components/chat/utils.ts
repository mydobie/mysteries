import { DOC_REPLACEMENT_TEXT } from "./constants";
import { Character, Doc } from "./types";

/**
 * Generates a unique ID using crypto.randomUUID if available,
 * otherwise falls back to a timestamp-based ID with random suffix
 */
export function generateMessageId(role: string): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${crypto.randomUUID()}-${role}`;
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${role}`;
}


export function cleanUpResponse({response, docList, character, solutionString=''}:{response: string, docList?: Doc[], character?: Character, solutionString?: string}): string {
  let displayMessage = response;
  if (character?.regex) {
    displayMessage = character.regex.reduce(
      (cleanedResponse, regex) => cleanedResponse.replace(regex, ''),
      displayMessage,
    );
  }

  if (docList && docList.length > 0) {
    displayMessage = docList.reduce((cleanedResponse, doc) => {
      return doc.regex.reduce((cleanedResponse, regex) => cleanedResponse.replace(regex, DOC_REPLACEMENT_TEXT), cleanedResponse);
    }, displayMessage);
  }

  return displayMessage.replace(solutionString, '');
}

export default function getCharacter(response: string, characters: Character[]): Character | undefined {
  return characters.find((char) => char.regex.some((regex) => regex.test(response)));
}

export function isSolutionString(response: string, solutionString: string): boolean {
  return response.includes(solutionString);
}