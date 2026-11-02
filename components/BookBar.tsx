"use client";
import { useI18n } from "@/lib/i18n";
import { minPrice } from "@/lib/config";
import { rooms } from "@/lib/data";
import { bookedOf, isFree, useBooking } from "@/lib/booking";
import DateRange from "./DateRange";

/** Barra bajo la portada: fechas + precio "desde" → baja al formulario con todo ya rellenado. */
export default function BookBar() {
  const { t } = useI18n();
  const { room, setRoom, dates, setDates, booked, bookedAll } = useBooking();
  const price = minPrice();

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    // Si la habitación elegida está ocupada esas noches, se pasa a una que esté libre
    if (!isFree(bookedOf(booked, room), ...dates)) {
      const r = rooms.find((x) => isFree(bookedOf(booked, x.id), ...dates));
      if (r) setRoom(r.id);
    }
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 700);
  };

  return (
    <form className={price ? "" : "noprice"} onSubmit={go} aria-label={t("nav_book")}>
      <DateRange value={dates} onChange={setDates} booked={bookedAll} />
      {price && (
        <div className="gf">
          <span className="lab">{t("from")}</span>
          <span className="dv"><b>{parseFloat(price)}</b><span><em>€</em><small>{t("per_night")}</small></span></span>
        </div>
      )}
      <button className="btn" type="submit"><span>{t("bar_btn")}</span><span className="ar">→</span></button>
    </form>
  );
}
