window.onload = async function () {

    loadMyRegistrations();
    loadEvents();

};

async function loadMyRegistrations() {

    const username = localStorage.getItem("username");

    try {

        const response = await fetch(
            `http://localhost:4731/api/register/student/${username}`
        );

        const registrations = await response.json();

        let output = "";

        if (registrations.length === 0) {

            output = "<p>No registrations yet</p>";

        } else {

            registrations.forEach(event => {

                output += `
                    <div class="event-card">

                        <h4>${event.name}</h4>

                        <p>
                            ${new Date(event.date).toLocaleDateString()}
                        </p>

                        <p>${event.venue}</p>

                    </div>
                `;
            });
        }

        document.getElementById(
            "myRegistrations"
        ).innerHTML = output;

    } catch (error) {

        console.log(error);

        document.getElementById(
            "myRegistrations"
        ).innerHTML =
            "<p>Unable to load registrations</p>";
    }
}

async function loadEvents() {

    const eventsDiv = document.getElementById("events");

    try {

        const response = await fetch(
            "http://localhost:4731/api/events"
        );

        const events = await response.json();

        let output = "";

        events.forEach(event => {

            const full =
                event.registrations >= event.capacity;

            output += `
                <div class="event-card">

                    <h4>${event.name}</h4>

                    <p>Date: ${new Date(event.date).toLocaleDateString()}</p>

                    <p>Venue: ${event.venue}</p>

                    <p>Capacity: ${event.capacity}</p>

                    ${
                        full
                        ? `
                            <button
                                disabled
                                class="disabled-btn">
                                Full
                            </button>
                          `
                        : `
                            <button
                                onclick="registerEvent('${event._id}')">
                                Register
                            </button>
                          `
                    }

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
}

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

        const msg =
            document.getElementById(
                `msg-${eventId}`
            );

        msg.innerText = data.message;

        if (response.ok) {

            msg.style.color = "green";

        } else {

            msg.style.color = "red";
        }

        setTimeout(() => {

            location.reload();

        }, 1000);

    } catch (error) {

        console.log(error);

        const msg =
            document.getElementById(
                `msg-${eventId}`
            );

        msg.innerText =
            "Registration failed";

        msg.style.color = "red";
    }
}