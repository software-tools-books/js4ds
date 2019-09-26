const fs = require('fs')
const DF = require('data-forge')

const dat = [
   { record_id: 12172, month: 1, day: 31, year: 1987, plot_id: NaN },
   { record_id: 1770, month: 4, day: 29, year: 1979, plot_id: NaN },
   { record_id: 28694, month: 10, day: 24, year: 1998, plot_id: NaN },
   { record_id: 6094, month: 6, day: 29, year: 1982, plot_id: NaN },
   { record_id: 18172, month: 12, day: 16, year: 1990, plot_id: NaN },
   { record_id: 19266, month: 11, day: 14, year: 1991, plot_id: NaN },
   { record_id: 5067, month: 11, day: 23, year: 1981, plot_id: NaN },
   { record_id: 6317, month: 7, day: 27, year: 1982, plot_id: NaN },
   { record_id: 31246, month: 8, day: 25, year: 2000, plot_id: NaN },
   { record_id: 19790, month: 3, day: 7, year: 1992, plot_id: NaN }
]

console.log(new DF.DataFrame(dat).deflate(row => row.plot_id).min());