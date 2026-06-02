window.onload = async function () {

    const eventsDiv = document.getElementById("events");

    try {

        const response = await fetch(
            "http://localhost:4731/api/events"
        );

        const events = await response.json();

        let output = "";

        events.forEach(event => {

            output += `
                <div class="event-card">

                    <h4>${event.name}</h4>

                    <p>Date: ${new Date(event.date).toLocaleDateString()}</p>

                    <p>Venue: ${event.venue}</p>

                    <p>Capacity: ${event.capacity}</p>

                    <button onclick="registerEvent('${event._id}')">
                        Register
                    </button>

                    <p id="msg-${event._id}"></p>

                </div>
            `;
        });

        eventsDiv.innerHTML = output;

    } catch (error) {

        console.log(error);

        eventsDiv.innerHTML =
            "<p>Unable to load events</p>";
    }
};

async function registerEvent(eventId) {

    const username = localStorage.getItem("username");

    try {

        const response = await fetch(
            "http://localhost:4731/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    eventId
                })
            }
        );

        const data = await response.json();

        document.getElementById(`msg-${eventId}`).innerText =
            data.message;

    } catch (error) {

        console.log(error);

        document.getElementById(`msg-${eventId}`).innerText =
            "Registration failed";
    }
}