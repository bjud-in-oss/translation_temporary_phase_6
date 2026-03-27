import { auth } from '../firebase';

export interface SecureCredentials {
  geminiKey: string | null;
  sfuKey1: string | null;
  sfuKey2: string | null;
}

/**
 * Fetches secure credentials from the Netlify BFF (Backend-For-Frontend).
 * Requires the user to be authenticated.
 * 
 * @param orgId The organization ID to fetch credentials for.
 * @returns A promise that resolves to the secure credentials.
 */
export const fetchSecureCredentials = async (orgId: string): Promise<SecureCredentials> => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('User must be authenticated to fetch credentials');
  }

  // Get the logged-in user's ID token
  const token = await currentUser.getIdToken();

  // Make a fetch request to the Netlify function
  const response = await fetch('/.netlify/functions/getCredentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ orgId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to fetch credentials: ${response.status} ${errorData.error || response.statusText}`);
  }

  // Return the result
  const data = await response.json();
  return data as SecureCredentials;
};
