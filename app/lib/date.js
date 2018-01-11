import { format } from 'date-fns'

export const formatDate = (date, dateFormat) =>
  (date && format(date, dateFormat || 'YYYY-MM-DD')) || ''
