"use client";

import { useActionState } from "react";

import type { FormState, Measurement } from "@/lib/types";


type Props = {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initial?: Measurement;
};


export function MeasurementForm({ action, initial }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const localDate = initial?.measured_at.slice(0, 16) ?? new Date().toISOString().slice(0, 16);
  return <form action={formAction} className="form panel">
    <label>Дата и время *<input name="measured_at" type="datetime-local" required defaultValue={localDate}/></label>
    <label>Режим *<select name="control_mode" defaultValue={initial?.control_mode ?? "conventional"}>
      <option value="conventional">Таймер / фотореле</option>
      <option value="adaptive">Адаптивный IoT</option>
    </select></label>
    <div className="grid">
      <label>Напряжение, В *<input name="voltage" type="number" step="0.1" min="0" max="500" required defaultValue={initial?.voltage ?? 220}/></label>
      <label>Ток, А *<input name="current" type="number" step="0.01" min="0" max="100" required defaultValue={initial?.current ?? 0}/></label>
      <label>Мощность, Вт *<input name="power" type="number" step="0.1" min="0" max="50000" required defaultValue={initial?.power ?? 0}/></label>
    </div>
    <label>Освещённость, лк *<input name="lux" type="number" step="0.1" min="0" required defaultValue={initial?.lux ?? 0}/></label>
    <label>Источник данных<select name="data_source" defaultValue={initial?.data_source ?? "manual"}>
      <option value="manual">Ручной ввод</option><option value="simulation">Симулятор</option><option value="mqtt">MQTT / ESP32-S3</option>
    </select></label>
    <label><span><input style={{width: "auto"}} name="lighting_on" type="checkbox" defaultChecked={initial?.lighting_on ?? true}/> Освещение включено</span></label>
    <label><span><input style={{width: "auto"}} name="device_online" type="checkbox" defaultChecked={initial?.device_online ?? true}/> Контроллер в сети</span></label>
    <label>Примечание<textarea name="note" rows={3} maxLength={500} defaultValue={initial?.note ?? ""}/></label>
    {state.error && <p className="error">{state.error}</p>}
    <button disabled={pending}>{pending ? "Сохранение…" : "Сохранить"}</button>
  </form>;
}
