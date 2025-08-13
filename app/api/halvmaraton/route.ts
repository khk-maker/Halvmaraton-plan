// File: app/api/halvmaraton/route.ts
import { writeFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET() {
  const { ICS } = await import("ics");
  const ics = new ICS();

  const events = [
    {
      title: "Intervaller – 10 km",
      date: "2025-08-14",
      description: "Fart: 4:00/km\n5 x 1 km, 90s pause",
    },
    {
      title: "Langtur – 18 km",
      date: "2025-08-17",
      description: "Rolig langtur, avslutt med 3 km i HM-fart",
    },
    {
      title: "HALVMARATON – RACE DAY",
      date: "2025-09-14",
      description: "Mål: Sub 1:30. Jevn fart, negative split.",
    }
  ];

  for (const e of events) {
    const [year, month, day] = e.date.split("-").map(Number);
    ics.addEvent({
      start: [year, month, day],
      title: e.title,
      description: e.description,
      duration: { hours: 24 },
      startOutputType: "local",
      allDay: true,
    });
  }

  const { value } = ics.toString();

  return new NextResponse(value, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": "inline; filename=halvmaraton.ics",
    },
  });
}

export const dynamic = "force-dynamic";
