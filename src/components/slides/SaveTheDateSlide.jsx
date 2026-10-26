function SaveTheDateSlide({ wedding }) {
  const [year, month, day] = wedding.eventDate.split("-").map(Number);

  const monthName = new Date(year, month - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const position = firstDay + day - 1;
  const col = position % 7;
  const row = Math.floor(position / 7);

  return (
    <div className="slide-content frame">
      <h1 className="script-title">Save the Date</h1>
      <h4 className="mt-4">
        {monthName} {year}
      </h4>

      <div className="calendar">
        {weekdays.map((w) => (
          <div key={w} className="cal-head">
            {w}
          </div>
        ))}

        {cells.map((d, index) =>
          d === day ? (
            <div
              key={index}
              className="cal-day marked"
              style={{ "--col": col, "--row": row }}
            >
              <span className="cal-heart-wrap">
                <svg className="cal-heart" viewBox="0 0 32 30" aria-hidden="true">
                  <path d="M16 28.5C16 28.5 1.5 18.5 1.5 9.5C1.5 4.8 5.2 1.5 9.2 1.5C12.2 1.5 14.8 3.2 16 5.8C17.2 3.2 19.8 1.5 22.8 1.5C26.8 1.5 30.5 4.8 30.5 9.5C30.5 18.5 16 28.5 16 28.5Z" />
                </svg>
              </span>
              <span className="cal-num">{d}</span>
            </div>
          ) : (
            <div key={index} className="cal-day">
              {d}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SaveTheDateSlide;