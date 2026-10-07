import Link from "next/link";

export default function NotFound() {
  return <div className="panel"><h1>404 — запись не найдена</h1><Link className="button" href="/measurements">Вернуться к списку</Link></div>;
}
