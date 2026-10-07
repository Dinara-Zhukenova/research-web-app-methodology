import { MeasurementForm } from "@/components/MeasurementForm";
import { createMeasurement } from "../actions";

export default function NewMeasurementPage() {
  return <section><h1>Новое измерение</h1><MeasurementForm action={createMeasurement}/></section>;
}
