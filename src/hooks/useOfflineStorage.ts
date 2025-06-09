
import { useState, useEffect, useCallback } from 'react';

interface OfflineMessage {
  id: string;
  conversationId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  synced: boolean;
}

interface OfflineConversation {
  id: string;
  title: string;
  messages: OfflineMessage[];
  lastUpdated: Date;
}

export const useOfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMessages, setOfflineMessages] = useState<OfflineMessage[]>([]);
  const [db, setDb] = useState<IDBDatabase | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDatabase();
        setDb(database);
        loadOfflineMessages(database);
      } catch (error) {
        console.error('Failed to initialize offline storage:', error);
      }
    };

    initDB();
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingMessages();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [db]);

  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('HarareZoneDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores for offline data
        if (!database.objectStoreNames.contains('offline_messages')) {
          const messageStore = database.createObjectStore('offline_messages', { keyPath: 'id' });
          messageStore.createIndex('conversationId', 'conversationId');
          messageStore.createIndex('synced', 'synced');
        }
        
        if (!database.objectStoreNames.contains('conversations')) {
          database.createObjectStore('conversations', { keyPath: 'id' });
        }
        
        if (!database.objectStoreNames.contains('user_preferences')) {
          database.createObjectStore('user_preferences', { keyPath: 'userId' });
        }
        
        if (!database.objectStoreNames.contains('offline_analytics')) {
          database.createObjectStore('offline_analytics', { keyPath: 'id' });
        }
      };
    });
  };

  const loadOfflineMessages = async (database: IDBDatabase) => {
    try {
      const transaction = database.transaction(['offline_messages'], 'readonly');
      const store = transaction.objectStore('offline_messages');
      const request = store.getAll();
      
      request.onsuccess = () => {
        setOfflineMessages(request.result);
      };
    } catch (error) {
      console.error('Failed to load offline messages:', error);
    }
  };

  const saveMessageOffline = useCallback(async (message: OfflineMessage) => {
    if (!db) return;

    try {
      const transaction = db.transaction(['offline_messages'], 'readwrite');
      const store = transaction.objectStore('offline_messages');
      await store.put(message);
      
      setOfflineMessages(prev => [...prev, message]);
      console.log('Message saved offline:', message);
    } catch (error) {
      console.error('Failed to save message offline:', error);
    }
  }, [db]);

  const saveConversationOffline = useCallback(async (conversation: OfflineConversation) => {
    if (!db) return;

    try {
      const transaction = db.transaction(['conversations'], 'readwrite');
      const store = transaction.objectStore('conversations');
      await store.put(conversation);
      console.log('Conversation saved offline:', conversation);
    } catch (error) {
      console.error('Failed to save conversation offline:', error);
    }
  }, [db]);

  const getOfflineConversations = useCallback(async (): Promise<OfflineConversation[]> => {
    if (!db) return [];

    try {
      const transaction = db.transaction(['conversations'], 'readonly');
      const store = transaction.objectStore('conversations');
      const request = store.getAll();
      
      return new Promise((resolve) => {
        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = () => {
          resolve([]);
        };
      });
    } catch (error) {
      console.error('Failed to get offline conversations:', error);
      return [];
    }
  }, [db]);

  const syncPendingMessages = useCallback(async () => {
    if (!db || !isOnline) return;

    try {
      const transaction = db.transaction(['offline_messages'], 'readwrite');
      const store = transaction.objectStore('offline_messages');
      const index = store.index('synced');
      
      // Use IDBKeyRange for proper IndexedDB querying
      const keyRange = IDBKeyRange.only(false);
      const request = index.getAll(keyRange);
      
      request.onsuccess = async () => {
        const unsyncedMessages = request.result;
        
        for (const message of unsyncedMessages) {
          try {
            // Attempt to sync with server
            const response = await fetch('/api/sync-message', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(message)
            });
            
            if (response.ok) {
              // Mark as synced
              message.synced = true;
              await store.put(message);
              console.log('Message synced:', message);
            }
          } catch (error) {
            console.error('Failed to sync message:', error);
          }
        }
        
        // Refresh offline messages
        loadOfflineMessages(db);
      };
    } catch (error) {
      console.error('Failed to sync pending messages:', error);
    }
  }, [db, isOnline]);

  const saveAnalyticsOffline = useCallback(async (analyticsData: any) => {
    if (!db) return;

    try {
      const transaction = db.transaction(['offline_analytics'], 'readwrite');
      const store = transaction.objectStore('offline_analytics');
      const data = {
        id: Date.now().toString(),
        ...analyticsData,
        timestamp: new Date(),
        synced: false
      };
      await store.put(data);
      console.log('Analytics saved offline:', data);
    } catch (error) {
      console.error('Failed to save analytics offline:', error);
    }
  }, [db]);

  const clearSyncedData = useCallback(async () => {
    if (!db) return;

    try {
      const transaction = db.transaction(['offline_messages'], 'readwrite');
      const store = transaction.objectStore('offline_messages');
      const index = store.index('synced');
      
      // Use IDBKeyRange for proper IndexedDB querying
      const keyRange = IDBKeyRange.only(true);
      const request = index.openCursor(keyRange);
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
    } catch (error) {
      console.error('Failed to clear synced data:', error);
    }
  }, [db]);

  return {
    isOnline,
    offlineMessages,
    saveMessageOffline,
    saveConversationOffline,
    getOfflineConversations,
    syncPendingMessages,
    saveAnalyticsOffline,
    clearSyncedData
  };
};
