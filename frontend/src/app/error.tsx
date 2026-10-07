"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="panel"><h1>Не удалось загрузить данные</h1><p>Проверьте, запущен ли backend.</p><button onClick={reset}>Повторить</button></div>;
}
