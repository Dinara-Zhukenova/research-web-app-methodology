import { notFound } from "next/navigation";

import { MeasurementForm } from "@/components/MeasurementForm";
import { api } from "@/lib/api";
import { deleteMeasurement, updateMeasurement } from "../actions";

export default async function MeasurementPage({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const item = await api.get(Number(id));
  if (!item) notFound();
  return <article>
    <h1>Измерение №{item.id}</h1>
    <div className="grid" style={{marginBottom: 20}}>
      <div className="card"><b>Мощность</b><div className="value">{item.power} Вт</div></div>
      <div className="card"><b>Напряжение / ток</b><div className="value">{item.voltage} В</div><span>{item.current} А</span></div>
      <div className="card"><b>Освещённость</b><div className="value">{item.lux} лк</div></div>
    </div>
    <p><b>Режим:</b> {item.control_mode === "adaptive" ? "Адаптивный IoT" : "Таймер / фотореле"}</p>
    <p><b>Дата:</b> {new Date(item.measured_at).toLocaleString("ru-RU")}</p>
    <p><b>Источник:</b> {item.data_source}</p>
    {item.note && <p><b>Примечание:</b> {item.note}</p>}
    <details className="panel" style={{margin: "20px 0"}}><summary><b>Редактировать</b></summary><div style={{marginTop: 18}}><MeasurementForm action={updateMeasurement.bind(null, item.id)} initial={item}/></div></details>
    <form action={deleteMeasurement.bind(null, item.id)}><button className="danger">Удалить измерение</button></form>
  </article>;
}
