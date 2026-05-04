import AsyncStorage from '@react-native-async-storage/async-storage';

export type ExpiryInboxBucket = 'expired' | 'urgent' | 'warning' | 'notice';

export type ExpiryInboxEntry = {
  id: string;
  foodId: string;
  bucket: ExpiryInboxBucket;
  place: string;
  daysUntilExpiry: number | null;
  name?: string;
  imageUrl?: string;
  createdAt: number;
};

const KEY = 'leschef_expiry_inbox';
const MAX_ENTRIES = 200;

function parse(raw: string | null): ExpiryInboxEntry[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (x): x is ExpiryInboxEntry =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as ExpiryInboxEntry).id === 'string' &&
        typeof (x as ExpiryInboxEntry).foodId === 'string',
    );
  } catch {
    return [];
  }
}

export async function getExpiryInbox(): Promise<ExpiryInboxEntry[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return parse(raw);
}

export async function prependExpiryInboxEntries(entries: ExpiryInboxEntry[]): Promise<void> {
  if (entries.length === 0) return;
  const prev = await getExpiryInbox();
  const next = [...entries, ...prev].slice(0, MAX_ENTRIES);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function clearExpiryInbox(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}

export async function removeExpiryInboxEntry(id: string): Promise<void> {
  const next = (await getExpiryInbox()).filter((e) => e.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export const EXPIRY_INBOX_STORAGE_KEY = KEY;
