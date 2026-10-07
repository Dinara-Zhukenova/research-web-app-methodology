export type ControlMode = "conventional" | "adaptive";
export type DataSource = "simulation" | "mqtt" | "manual";

export type Measurement = {
  id: number;
  measured_at: string;
  control_mode: ControlMode;
  voltage: number;
  current: number;
  power: number;
  lux: number;
  lighting_on: boolean;
  device_online: boolean;
  data_source: DataSource;
  note: string | null;
  created_at: string;
};

export type MeasurementInput = Omit<Measurement, "id" | "created_at">;
export type MeasurementList = {
  items: Measurement[];
  total: number;
  limit: number;
  offset: number;
};
export type Comparison = {
  conventional_average_power: number;
  adaptive_average_power: number;
  savings_percent: number;
};
export type FormState = { error?: string };
