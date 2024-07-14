const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn "),
  prompt = document.querySelector(".prompt"),
  promptContainer = document.querySelector(".prompt-container"),
  generatePrompts = document.querySelector(".prompt-heading"),
  editEvent = document.querySelector(".edit-btn"),
  addEventTitle = document.querySelector(".date-title "),
  addEventName = document.querySelector(".event-name "),
  addEventNotes = document.querySelector(".event-notes "),
  addEmoji = document.querySelector(".svg-outline-placeholder"),
  originalAddEmojiContent = addEmoji.innerHTML;

  // localStorage.clear();

let today = new Date();
let activeDay = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



// const eventsArr = [
//   {
//     day: 5,
//     month: 7,
//     year: 2024,
//     events: [
//       {
//         title: "What did I do today that made me feel fulfilled?",
//         description: " What did I do today that made me feel fulfilled? What did I do today that made me feel fulfilled?"
//       }
//     ],
//   },
// ];

const eventsArr = [];
console.log(eventsArr);
getEvents();

function initCalendar() {
  //prev current and next month dates
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;


  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {

    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    if ( i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {

      activeDay = i;
      
      getActiveDay(i);
      updateEvents(i);


      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      }
      else{
        days += `<div class="day today active">${i}</div>`;
      }

    }
    else{
      if (event) {
        days += `<div class="day event">${i}</div>`;
      }
      else{
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListner();
}

initCalendar();



function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  if(month === new Date().getMonth()){
    month;
  }else{
    month++;
  }
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);



const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", e => {
  textarea.style.height = "100px";
  let scHeight = e.target.scrollHeight;
  textarea.style.height = `${scHeight}px`;

});


addEventTitle.innerHTML = activeDay + " " + months[month] + " " + year;
const originalAddEventTitle = addEventTitle.innerHTML;

addEventTitle.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  
  
  addEventTitle.innerHTML = originalAddEventTitle;
  addEventName.value = "";
  addEventNotes.value = "";
  addEmoji.innerHTML = originalAddEmojiContent;


  initCalendar();
  updateEvents(activeDay);
});



function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
      day.addEventListener("click", (e) => {
        const today = new Date();
        const selectedDate = new Date(year, month, Number(e.target.innerHTML));

        if (selectedDate > today) {
          alert("You cannot select a future date.");
          return;
        }


        getActiveDay(e.target.innerHTML); 
        
        updateEvents(Number(e.target.innerHTML));
        
        activeDay = Number(e.target.innerHTML);
       
        // remove active
        days.forEach((day) => {
          day.classList.remove("active");
        });
        
        //if clicked prev-date or next-date switch to that month
        if (e.target.classList.contains("prev-date")) {
          prevMonth();
          
          //add active to clicked day afte month is change
          setTimeout(() => {
            
            //add active where no prev-date or next-date
            const days = document.querySelectorAll(".day");

            days.forEach((day) => {
              if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                day.classList.add("active");
              }
            });
          }, 100);

        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
          
          //add active to clicked day after month is changed
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          e.target.classList.add("active");
        }
      });
    });
  }



function getActiveDay(date) {
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}


function updateEvents(date) {
  let events = "";

  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `
        <div class="event">
          <div class="title">
            <div class="event-title">${event.title}</div>
          </div>
          <div class="event-description">
          <span class="event-description" height = "50%">${event.description}</span>
          </div>
          <div class="svg-outline-saved">${event.emoji}</div>

        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h4>No Event Recorded</h4>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

// ------EDIT EVENTS------

function addEditEventListeners() {
  editEvent.addEventListener ("click", ()=>{
    addEventTitle.innerHTML = eventDate.innerHTML;

    const [day, monthName, year] = eventDate.innerHTML.split(" ");
    const monthIndex = months.indexOf(monthName); 
    const dayElements = document.querySelectorAll(".day");
    let targetDayElement;

    dayElements.forEach((dayElement) => {
      if (
        Number(dayElement.innerHTML) === Number(day) &&
        !dayElement.classList.contains("prev-date") &&
        !dayElement.classList.contains("next-date")
      ) {
        targetDayElement = dayElement;
      }
    });

    if (targetDayElement && targetDayElement.classList.contains("event")) {
        console.log("This day has an event.");
        eventsArr.forEach((eventObj) => {
          if (
            eventObj.day === Number(day) &&
            eventObj.month === monthIndex + 1 && // months array is 0-indexed
            eventObj.year === Number(year)
          ) {
            eventObj.events.forEach((event) => {
              addEventName.value = event.title;
              addEventNotes.value = event.description;
              addEmoji.innerHTML = event.emoji;
            });

          }
        });
    } else {
      console.log("This day does not have an event.");
    }
    

  });
}

addEditEventListeners();


  addEventSubmit.addEventListener("click", () => {
    const eventName = addEventName.value;
    const eventNote = addEventNotes.value;
    const emoji = addEmoji.innerHTML;

    let eventExist = false;
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((event) => {
          if (event.title === eventName && event.description === eventNote && event.emoji === emoji) {
            eventExist = true;
          }
        });
      }
    });
    if (eventExist) {
      alert("Event already added");
      return;
    }


    const newEvent = {
      title : eventName,
      description : eventNote,
      emoji : emoji,
    };

    let eventAdded = false;

    if (eventsArr.length > 0) {
      eventsArr.forEach((item,index) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          if (confirm("Do you wish to save changes?")) {
            // Find and delete the existing event
            eventsArr.splice(index, 1);
  

              // If the event list for the day is empty after deletion, remove the day from eventsArr
              if (item.events.length === 0) {
                const dayIndex = eventsArr.indexOf(item);
                eventsArr.splice(dayIndex, 1);
                console.log("Day removed from eventsArr"); // Debugging line
              }
              localStorage.setItem("events", JSON.stringify(eventsArr)); // Update local storage
              updateEvents(activeDay); // Update the events displayed

            eventsArr.push({
              day: activeDay,
              month: month + 1,
              year: year,
              events: [newEvent],
            });
            eventAdded = true;

          }else{
            alert("Changes are not saved.");
            eventAdded = true;
          }

        }  

      });
    }
        
    if (!eventAdded) {
        eventsArr.push({ 
          day: activeDay, month: month + 1, year: year, events: [newEvent],
        });
    }

    updateEvents(activeDay);

    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }
  });



 eventsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("event")) {
            if (confirm("Are you sure you want to delete this event?")) {
                const eventName = e.target.children[0].children[0].innerHTML;
                console.log("Event Name:", eventName); // Debugging line

                let updated = false;

                eventsArr.forEach((event) => {
                    if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                        event.events.forEach((item, index) => {
                            if (item.title === eventName) {
                                event.events.splice(index, 1);
                                updated = true;
                                console.log("Event deleted"); // Debugging line
                            }
                        });

                        // If no events left in a day then remove that day from eventsArr
                        if (event.events.length === 0) {
                            eventsArr.splice(eventsArr.indexOf(event), 1);
                            console.log("Day removed from eventsArr"); // Debugging line

                            // Remove event class from day
                            const activeDayEl = document.querySelector(".day.active");
                            if (activeDayEl && activeDayEl.classList.contains("event")) {
                                activeDayEl.classList.remove("event");
                            }
                        }
                    }
                });

                if (updated) {
                    localStorage.setItem("events", JSON.stringify(eventsArr)); // Update local storage
                    updateEvents(activeDay);
                }
            }
        }
    });


function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}





// prompts.forEach((prompt) => {
//   prompt.addEventListener("click", () => {
//     addEventName.value = prompt.innerHTML;
//   });
// });
// function generatePrompts(){
//   const morePrompts = document.querySelector(".generate-prompt-btn");

//   for (let i = 0; i <= 5; i++) {

//     var number = [Math.floor(Math.random * prompts.length)];
//     console.log([number]);
    
//   }
//   morePrompts.addEventListener("click", () =>{

//   })
// }


const prompts =  [
  "What made me smile today?",
  "Did I overcome a challenge today?",
  "What was the best part of my day?",
  "Did I learn something new today?",
  "Did I witness a moment of kindness?",
  "Was there an unexpected surprise today?",
  "Did I have a fun conversation today?",
  "Did I achieve a goal today?",
  "What made me laugh today?",
  "Did I visit a new place today?",
  "What was my favorite meal today?",
  "Did a song capture my mood today?",
  "Did I enjoy a movie or show today?",
  "Did I read an interesting book or article?",
  "What am I grateful for today?",
  "Who inspired me today?",
  "Did I indulge in a hobby today?",
  "Did I find a moment of peace today?",
  "What interesting fact did I discover today?",
  "How did I relax today?",
  "Did I work on a creative project?",
  "Did I have a moment of reflection today?",
  "What lesson did I learn today?",
  "What did I do for myself today?",
  "Did a memory resurface today?",
  "What goal did I set for tomorrow?",
  "Did I help someone today?",
  "What skill did I practice today?",
  "How did I practice self-care today?",
  "What funny incident happened today?",
  "What was my favorite quote today?",
  "What challenged me today?",
  "Did I gain a new perspective today?",
  "Did I have an interesting dream last night?",
  "What conversation stood out today?",
  "Did I have a moment of bravery today?",
  "What habit did I start or continue today?",
  "What mistake did I learn from today?",
  "Where did I find inspiration today?",
  "Did I reconnect with someone today?",
  "What goal am I working towards?",
  "Did I have a moment of spontaneity today?",
  "What am I proud of today?",
  "What was my favorite part of my routine today?",
  "Did I have a moment of clarity today?",
  "Did I follow a tradition today?",
  "Did I share a special moment with a loved one?",
  "What decision did I make today?",
  "What accomplishment am I proud of today?",
  "How did I make a difference today?",
];

function generateRandomPrompts(count) {
  const shuffledPrompts = prompts.sort(() => Math.random() - 0.5); // Shuffle array
  console.log(shuffledPrompts.slice(0, count));
  return shuffledPrompts.slice(0, count); // Get first 'count' prompts
}

function displayRandomPrompts() {
  promptContainer.innerHTML = ""; // Clear previous prompts
  const randomPrompts = generateRandomPrompts(5); // Generate 5 random prompts

  randomPrompts.forEach(prompt => {
      // promptElement.dataset.index = index;
      const promptElement = document.createElement("div");
      promptElement.classList.add("prompt", "prompts");
      promptElement.textContent = prompt;

      promptElement.addEventListener('click', () => {
        addEventName.value = prompt;
    });

      promptContainer.appendChild(promptElement);
  });
}
displayRandomPrompts();
generatePrompts.addEventListener("click", displayRandomPrompts);



