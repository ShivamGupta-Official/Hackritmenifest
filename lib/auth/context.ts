import { headers } from 'next/headers';

/**
 * Retrieves the current organization ID from the request context.
 * This must be called within a Server Component or Server Action.
 */
export async function getTenantContext() {
  const headersList = await headers();
  const orgId = headersList.get('x-org-id');
  
  if (!orgId) {
    // Fallback for development if middleware isn't covering the route
    return { organizationId: 'default-org-id' };
  }
  
  return {
    organizationId: orgId
  };
}
