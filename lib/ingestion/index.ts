import { db } from '../db';
import { ContentItem } from '../db/schema';

export interface IngestionResult {
  success: number;
  failed: number;
  errors: string[];
}

export async function ingestCSVContent(orgId: string, csvContent: string): Promise<IngestionResult> {
  const result: IngestionResult = { success: 0, failed: 0, errors: [] };
  
  if (!csvContent || csvContent.trim() === '') {
    result.errors.push('Empty CSV content');
    return result;
  }

  const lines = csvContent.split('\n').filter(line => line.trim().length > 0);
  const header = lines.shift()?.split(',').map(h => h.trim().toLowerCase());
  
  if (!header || !header.includes('title')) {
    result.errors.push('Invalid CSV format: Missing "title" header.');
    return result;
  }

  for (let i = 0; i < lines.length; i++) {
    try {
      const values = lines[i].split(',').map(v => v.trim());
      const record: any = {};
      
      header.forEach((col, index) => {
        record[col] = values[index];
      });

      if (!record.title) {
        throw new Error(`Row ${i+2}: Missing title`);
      }

      await db.addContentItem({
        organizationId: orgId,
        platform: record.platform || 'linkedin',
        format: record.format || 'text',
        title: record.title,
        content: record.content || '',
        publishedAt: record.published_at ? new Date(record.published_at) : new Date(),
        metrics: {
          views: parseInt(record.views || '0', 10),
          likes: parseInt(record.likes || '0', 10),
          comments: parseInt(record.comments || '0', 10),
          shares: parseInt(record.shares || '0', 10),
          clicks: parseInt(record.clicks || '0', 10),
          spend: parseFloat(record.spend || '0'),
          revenue: parseFloat(record.revenue || '0')
        }
      });
      result.success++;
    } catch (err: any) {
      result.failed++;
      result.errors.push(err.message);
    }
  }

  return result;
}

export async function ingestManualContent(orgId: string, itemData: any): Promise<boolean> {
  try {
    await db.addContentItem({
      ...itemData,
      organizationId: orgId,
    });
    return true;
  } catch (err) {
    console.error('Manual ingestion failed:', err);
    return false;
  }
}
