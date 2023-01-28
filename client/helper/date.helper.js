export const dateEngine = (e) => {
  let t = new Date().getTime(),
    n = new Date(e),
    a = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    l = n.getDate(),
    r = n.getMonth(),
    d = n.getFullYear(),
    g = new Date().getDate(),
    o = new Date().getMonth() + 1,
    i = new Date().getFullYear();
  h = new Date().getHours();
  o < 10 && (o = "0" + o), g < 10 && (g = "0" + g);
  let u = l + " " + a[r] + " " + d,
    w = { day: g, month: o, year: i },
    y = { deadlineDay: l, deadlineMonth: a[r], deadlineYear: d };
  let dayPeriod;
  dayPeriod = h < 12 ? "Morning" : h < 18 ? "Afternoon" : "Evening";
  return { ...w, ...y, dateForm: u, nowDateTime: t, dayPeriod: dayPeriod };
};
