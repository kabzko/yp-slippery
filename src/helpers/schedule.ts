const schedules = [
    {
        id: "1",
        name: "Regular Schedule",
        time_in: "08:00",
        time_out: "17:00",
        restday: "Saturday",
        flexible_schedule: "No",
        breaktime: "Fixed",
        default: "yes"
    },
    {
        id: "2",
        name: "Sunday Off",
        time_in: "04:00",
        time_out: "12:00",
        restday: "Sunday",
        flexible_schedule: "Yes",
        breaktime: "Flexible",
        default: "no"
    },
    {
        id: "3",
        name: "Placeholder",
        time_in: "00:00",
        time_out: "00:00",
        restday: "Monday",
        flexible_schedule: "Yes",
        breaktime: "Flexible",
        default: "no"
    }
]

export default schedules