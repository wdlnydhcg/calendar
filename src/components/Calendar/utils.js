export const getYearMonthDay = (time) => {
  const now = time ? new Date(time) : new Date()
  const year = now.getFullYear() // 2021
  const month = now.getMonth() + 1 // 0 - 11
  const day = now.getDate()
  const week = now.getDay()
  const result = { year, month, day, week }
  return result
}

export const holidayList = [
  '2021-1-1',
  '2021-1-2',
  '2021-1-3',
  '2021-2-11',
  '2021-2-12',
  '2021-2-13',
  '2021-2-14',
  '2021-2-15',
  '2021-2-16',
  '2021-2-17',
  '2021-4-3',
  '2021-4-4',
  '2021-4-5',
  '2021-5-1',
  '2021-5-2',
  '2021-5-3',
  '2021-5-4',
  '2021-5-5',
  '2021-6-12',
  '2021-6-13',
  '2021-6-14',
  '2021-9-19',
  '2021-9-20',
  '2021-9-21',
  '2021-10-1',
  '2021-10-2',
  '2021-10-3',
  '2021-10-4',
  '2021-10-5',
  '2021-10-6',
  '2021-10-7'
]

export const workdayList = ['2021-2-7', '2021-2-20', '2021-4-25', '2021-5-8', '2021-9-18', '2021-9-26', '2021-10-9']
