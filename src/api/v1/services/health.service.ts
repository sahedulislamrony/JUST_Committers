export interface HealthStatus {
  status: string;
  timestamp: string;
}

export const getHealthData = (): HealthStatus => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
  };
};
