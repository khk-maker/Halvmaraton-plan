import type { NextApiRequest, NextApiResponse } from 'next'
import { createEvents } from 'ics'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const eventObjects = events.map(e => {
    const [year, month, day] = e.date.split('-').map(Number)
    return {
      start: [year, month, day],
      title: e.title,
      description: e.description,
      duration: { hours: 24 },
      startOutputType: 'local',
      allDay: true,
    }
  })

  const { error, value } = createEvents(eventObjects)

  if (error) {
    return res.status(500).send(String(error))
  }

  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader('Content-Disposition', 'inline; filename=halvmaraton.ics')
  return res.status(200).send(value)
}
