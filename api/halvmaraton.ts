import { createEvent } from 'ics'

export default function handler(req: any, res: any) {
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
  ]

  let icsText = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n'

  for (const e of events) {
    const [year, month, day] = e.date.split('-').map(Number)

    const { error, value } = createEvent({
      start: [year, month, day, 9, 0], // starter 09:00
      duration: { hours: 1 },
      title: e.title,
      description: e.description,
      status: 'CONFIRMED',
      busyStatus: 'BUSY'
    })

    if (error) {
      return res.status(500).send(`Feil ved ${e.title}: ${error}`)
    }

    icsText += value + '\n'
  }

  icsText += 'END:VCALENDAR'

  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader('Content-Disposition', 'inline; filename=halvmaraton.ics')
  return res.status(200).send(icsText)
}



