import { useState, useEffect } from 'react';

interface LogSyncResult {
  logs: any[];
  isLoading: boolean; 
}

// Custom hook to synchronize logs based on selected application and date range
export default function useLogSync(selectedApp: string, start: string, end: string): LogSyncResult {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching logs from the backend based on date range
    const fetchLogsFromBackend = async (): Promise<any[]> => {
      const mockLogs: any[] = [
        { id: 121, date: '2024-05-22', employee: { id: 1 }, timein: '08:00:00', timeout: '17:55:01' },
        { id: 122, date: '2024-05-22', employee: { id: 1 }, timein: '13:03:02', timeout: '17:35:01' },
      ];

      // Filter logs based on the date range
      const filteredLogs = mockLogs.filter((log: any) => log.date && log.date >= start && log.date <= end);

      return filteredLogs;
    };

    // Function to fetch logs and handle loading status
    const fetchLogs = async (): Promise<void> => {
      setIsLoading(true); // Set loading status to true before fetching logs
      try {
        const fetchedLogs = await fetchLogsFromBackend();
        setLogs(fetchedLogs); // Update logs state with fetched logs
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchLogs(); 
  }, [selectedApp, start, end]);

  return { logs, isLoading }; 
}