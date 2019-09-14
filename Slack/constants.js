const LEAVE_TYPE_DEFAULT = "LEAVE_TYPE_DEFAULT";


const PAID_OFF = {
  name: "Paid time off",
  value: "PAID_TIME_OFF",
  daysRemaining: 20,
  startDate: new Date(),
  endDate: new Date(),
  isTimeRangeNeeded: false
}
const PAID_OFF_HALF_DAY = {
  name: "Paid time off(Half day)",
  value: "PAID_TIME_OFF_HALF_DAY",
  daysRemaining: "20",
  startDate: new Date(),
  endDate: new Date(),
  isTimeRangeNeeded: true
}
const CONFERENCE = {
  name: "Conference",
  value: "CONFERENCE",
  daysRemaining: "5",
  startDate: new Date(),
  endDate: new Date(),
  isTimeRangeNeeded: false
}
const SICK_OFF = {
  name: "Sick day",
  value: "SICK_OFF",
  daysRemaining: "10",
  startDate: new Date(),
  endDate: new Date(),
  isTimeRangeNeeded: false
}
const WORKING_REMOTELY = {
  name: "Working remotely",
  value: "WORKING_REMOTELY",
  daysRemaining: "Unlimited",
  startDate: new Date(),
  endDate: new Date(),
  isTimeRangeNeeded: false
}

const ALL_LEAVE_TYPES = [PAID_OFF, PAID_OFF_HALF_DAY, CONFERENCE, SICK_OFF, WORKING_REMOTELY];

module.exports = {
  ALL_LEAVE_TYPES,
  LEAVE_TYPE_DEFAULT,
  SICK_OFF,
  PAID_OFF, PAID_OFF_HALF_DAY, CONFERENCE, WORKING_REMOTELY
}