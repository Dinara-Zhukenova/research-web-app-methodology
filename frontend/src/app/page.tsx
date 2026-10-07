import Link from "next/link";
import { api } from "@/lib/api";

export default async function HomePage() {
  let comparison = null;
  try { comparison = await api.comparison(); } catch { /* backend may be starting */ }
  return <section>
    <h1>Интеллектуальная система управления освещением</h1>
    <p className="muted">Панель исследования энергопотребления обычного и адаптивного IoT-управления городской линией освещения.</p>
    <div className="grid" style={{margin: "24px 0"}}>
      <div className="card"><b>Обычный режим</b><div className="value">{comparison?.conventional_average_power ?? "—"} Вт</div></div>
      <div className="card"><b>Адаптивный IoT</b><div className="value">{comparison?.adaptive_average_power ?? "—"} Вт</div></div>
      <div className="card"><b>Расчётная экономия</b><div className="value">{comparison?.savings_percent ?? "—"} %</div></div>
    </div>
    <Link className="button" href="/measurements">Открыть измерения</Link>
  </section>;
}
