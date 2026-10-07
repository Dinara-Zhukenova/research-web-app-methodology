import Link from "next/link";

import { api } from "@/lib/api";


const PAGE_SIZE = 10;

export default async function MeasurementsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mode?: string; sort?: string; order?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const q = params.q ?? "";
  const mode = params.mode ?? "";
  const sort = params.sort ?? "measured_at";
  const order = params.order ?? "desc";
  const result = await api.list(q, mode, sort, order, page, PAGE_SIZE);
  const pageLink = (next: number) => `/measurements?${new URLSearchParams({q, mode, sort, order, page: String(next)})}`;
  return <section>
    <div className="actions"><h1>Измерения освещения</h1><Link className="button" href="/measurements/new">Добавить</Link></div>
    <form className="toolbar panel" style={{marginBottom: 18}}>
      <label style={{flex: 2}}>Поиск по источнику или примечанию<input name="q" defaultValue={q} placeholder="Например: MQTT или улица Абая"/></label>
      <label>Режим<select name="mode" defaultValue={mode}><option value="">Все</option><option value="conventional">Обычный</option><option value="adaptive">Адаптивный</option></select></label>
      <label>Сортировка<select name="sort" defaultValue={sort}><option value="measured_at">Дата</option><option value="power">Мощность</option><option value="lux">Освещённость</option><option value="voltage">Напряжение</option></select></label>
      <label>Порядок<select name="order" defaultValue={order}><option value="desc">По убыванию</option><option value="asc">По возрастанию</option></select></label>
      <button>Применить</button>
    </form>
    <p className="muted">Найдено записей: {result.total}</p>
    {result.items.length ? <div className="table-wrap"><table><thead><tr><th>№</th><th>Дата</th><th>Режим</th><th>Мощность</th><th>Освещённость</th><th>Источник</th></tr></thead><tbody>
      {result.items.map(item => <tr key={item.id}><td><Link href={`/measurements/${item.id}`}><b>{item.id}</b></Link></td><td>{new Date(item.measured_at).toLocaleString("ru-RU")}</td><td>{item.control_mode === "adaptive" ? "Адаптивный IoT" : "Таймер / фотореле"}</td><td>{item.power} Вт</td><td>{item.lux} лк</td><td>{item.data_source}</td></tr>)}
    </tbody></table></div> : <div className="panel">Ничего не найдено.</div>}
    <div className="actions">
      {page > 1 ? <Link className="button secondary" href={pageLink(page - 1)}>← Назад</Link> : <span/>}
      {page * PAGE_SIZE < result.total && <Link className="button secondary" href={pageLink(page + 1)}>Далее →</Link>}
    </div>
  </section>;
}
