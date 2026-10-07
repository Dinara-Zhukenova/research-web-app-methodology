"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "@/lib/api";
import type { FormState, MeasurementInput } from "@/lib/types";


function parseForm(formData: FormData): MeasurementInput | null {
  const text = (name: string) => String(formData.get(name) ?? "").trim();
  const number = (name: string) => Number(text(name));
  const data = {
    measured_at: text("measured_at"),
    control_mode: text("control_mode") as MeasurementInput["control_mode"],
    voltage: number("voltage"),
    current: number("current"),
    power: number("power"),
    lux: number("lux"),
    lighting_on: formData.get("lighting_on") === "on",
    device_online: formData.get("device_online") === "on",
    data_source: text("data_source") as MeasurementInput["data_source"],
    note: text("note") || null,
  };
  if (!data.measured_at || ![data.voltage, data.current, data.power, data.lux].every(Number.isFinite)) return null;
  return data;
}


export async function createMeasurement(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = parseForm(formData);
  if (!data) return { error: "Проверьте обязательные поля и числовые значения." };
  let id: number;
  try { id = (await api.create(data)).id; }
  catch { return { error: "Не удалось сохранить измерение. Проверьте введённые данные." }; }
  revalidatePath("/");
  revalidatePath("/measurements");
  redirect(`/measurements/${id}`);
}


export async function updateMeasurement(
  id: number,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = parseForm(formData);
  if (!data) return { error: "Проверьте обязательные поля и числовые значения." };
  try { await api.update(id, data); }
  catch { return { error: "Не удалось сохранить изменения." }; }
  revalidatePath("/");
  revalidatePath("/measurements");
  redirect(`/measurements/${id}`);
}


export async function deleteMeasurement(id: number) {
  await api.remove(id);
  revalidatePath("/");
  revalidatePath("/measurements");
  redirect("/measurements");
}
