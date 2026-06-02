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

    } catch (error) {

        console.log(error);

        document.getElementById("msg").innerText =
            "Unable to create event";
    }
}