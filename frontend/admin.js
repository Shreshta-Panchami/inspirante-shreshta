document.getElementById("createBtn").addEventListener("click", createEvent);

async function createEvent() {

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const venue = document.getElementById("eventVenue").value;
    const capacity = document.getElementById("eventCapacity").value;

    try {

        const response = await fetch(
            "http://localhost:4731/api/events",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    date,
                    venue,
                    capacity
                })
            }
        );

        const data = await response.json();

        document.getElementById("msg").innerText =
            data.message;

        loadEvents();

    } catch (error) {

        console.log(error);

        document.getElementById("msg").innerText =
            "Unable to create event";
    }
}

async function loadEvents() {

    try {

        const response = await fetch(
            "http://localhost:4731/api/events"
        );

        const events = await response.json();

        let output = "";

        events.forEach(event => {

            const percentage =
                Math.round(
                    (event.registrations / event.capacity) * 100
                );

            let color = "green";

            if (percentage >= 80) {
                color = "red";
            }
            else if (percentage >= 50) {
                color = "orange";
            }

            output += `
                <div class="event-card">

                    <h4>${event.name}</h4>

                    <p>Date: ${new Date(event.date).toLocaleDateString()}</p>

                    <p>Venue: ${event.venue}</p>

                    <p>Capacity: ${event.capacity}</p>

                    <p>Registered: ${event.registrations}</p>

                    <p style="color:${color}; font-weight:bold;">
                        Filled: ${percentage}%
                    </p>

                    <button onclick="viewStudents('${event._id}')">
                        View Students
                    </button>

<div id="students-${event._id}" style="margin-top:15px;"></div>
                </div>
            `;
        });

        document.getElementById("eventList").innerHTML =
            output;

    } catch (error) {

        console.log(error);

        document.getElementById("eventList").innerHTML =
            "Unable to load events";
    }
}

async function viewStudents(eventId) {

    try {

        const response = await fetch(
            `http://localhost:4731/api/register/event/${eventId}`
        );

        const students = await response.json();

        let output = "<h4>Registered Students</h4>";

        if (students.length === 0) {

            output += "<p>No registrations yet</p>";

        } else {

            students.forEach(student => {

                output += `
                    <p>
                        ${student.name}
                        (${student.username})
                    </p>
                `;
            });
        }

        document.getElementById(
            `students-${eventId}`
        ).innerHTML = output;

    } catch (error) {

        console.log(error);
    }
}

loadEvents();