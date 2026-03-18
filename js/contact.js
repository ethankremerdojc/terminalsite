function initializeContactFormListener() {
  document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const body = new URLSearchParams();

    let email = e.target.querySelector("input").value;
    let notes = e.target.querySelector("textarea").value;

    body.append("email", email);
    body.append("notes", notes);

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    if (res.ok) {
      document.getElementById("contact-submit-button").textContent = "Thank You!";
      form.reset();
    } else {
      document.getElementById("contact-submit-button").textContent = "Submission failed.";
    }
  });
}

