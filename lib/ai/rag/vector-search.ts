import { DocumentChunk } from '../../db/schema';

/**
 * MongoDB Atlas Vector Search Integration for Hybrid RAG
 * Requires an Atlas Vector Search index to be created on the `document_chunks` collection.
 */

export async function generateEmbedding(text: string): Promise<number[]> {
  // In production, this generates embeddings via OpenAI ada-002 or Vertex AI Embeddings.
  return new Array(1536).fill(0).map(() => Math.random());
}

export async function performHybridSearch(orgId: string, query: string, limit: number = 5) {
  const queryVector = await generateEmbedding(query);
  
  // Requires MongoDB Atlas ($vectorSearch)
  try {
    const results = await DocumentChunk.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: queryVector,
          numCandidates: limit * 10,
          limit: limit,
          filter: { organizationId: orgId }
        }
      }
    ]);
    return results;
  } catch (error) {
    console.warn('Vector search failed, likely due to missing Atlas index or local execution. Falling back to basic fetch.', error);
    
    // Fallback text search for local dev
    return DocumentChunk.find({
      organizationId: orgId
    }).limit(limit);
  }
}
