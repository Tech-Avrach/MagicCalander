document.addEventListener("DOMContentLoaded", function () {
  var data = [];

  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "multiMonthYear",

    allDaySlot: false,

    editable: true,

    nowIndicator: true,

    // DatenavLink: true,

    eventOverlap: true,

    // dateClick: function(info) {

    //   info.dayEl.style.backgroundColor = 'red';
    // },

    selectable: true,

    select: function (info) {
      let eventTitle;
      Swal.fire({
        title: "Title",
        text: "Enter event title",
        input: "text",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          eventTitle = result.value;
          let col = choseColor();
          let clickData = {
            title: eventTitle,
            start: info.startStr,
            end: info.endStr,
            color: col,
            textColor: "black",
          };
          calendar.addEvent(clickData);
        } else if (!result.value) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Title not be empty",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },

    headerToolbar: {
      left: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,list",
      center: "title",
      right: "prev,today,next",
    },

    buttonText: {
      today: "Today",
      year: "Year",
      month: "Month",
      week: "Week",
      day: "Day",
      list: "List",
    },

    eventSources: [{ events: data }],

    eventClick: function (info) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete the event: " + info.event.title + " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          info.event.remove();
        }
      });
    },
  });

  calendar.render();

  $("#addEvent").click(function () {
    $("#eventForm").slideDown();
  });

  $("#submit").click(function () {
    submit();
  });

  $("#cancel").click(function () {
    $("#eventForm").slideUp();
  });

  function submit() {
    var title = $("#title").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var col = choseColor();
    var eventData = {
      title: title,
      start: startDate + "T" + startTime,
      end: endDate + "T" + endTime,
      color: col,
      textColor: "black",
    };
    calendar.addEvent(eventData);

    clearForm();
  }

  function choseColor() {
    var color = [
      "#df73ff",
      "#df73ff",
      "#ff0000",
      "#40e0d0",
      "#7fff00",
      "#03BFFF",
      "#d2b48c",
      "#fff44f",
      "#9acd32",
      "#7fff00",
      "#ff00ff",
    ];
    return color[parseInt(Math.random() * 10 + 1)];
  }

  function clearForm() {
    $("#title").val("");
    $("#startDate").val("");
    $("#endDate").val("");
    $("#startTime").val("");
    $("#endTime").val("");
    $("#eventForm").slideUp();
  }
});
