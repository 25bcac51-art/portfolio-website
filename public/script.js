document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capture the three input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const msgElement = document.getElementById('responseMessage');

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        
        if (result.success) {
            msgElement.innerText = "Success! Your message and email have been saved.";
            msgElement.style.color = "green";
            // Clear the form
            document.getElementById('contactForm').reset();
        } else {
            msgElement.innerText = "Something went wrong on the server.";
            msgElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        msgElement.innerText = "Error: Could not connect to the server.";
        msgElement.style.color = "red";
    }
});