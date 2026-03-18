function initializeContactFormListener() {
  document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const fd = new FormData();

    let email = e.querySelector("input").value;
    let notes = e.querySelector("textarea").value;

    fd.append("email", email);
    fd.append("notes", notes);

    const res = await fetch("/contact", {
      method: "POST",
      body: data
    });

    if (res.ok) {
      document.getElementById("contact-submit-button").textContent = "Thank You!";
      form.reset();
    } else {
      document.getElementById("contact-submit-button").textContent = "Submission failed.";
    }
  });
}

