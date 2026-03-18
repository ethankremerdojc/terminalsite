function initializeContactFormListener() {
  document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const fd = new FormData();

    let email = e.target.querySelector("input").value;
    let notes = e.target.querySelector("textarea").value;

    fd.append("email", email);
    fd.append("notes", notes);

    const res = await fetch("/contact", {
      method: "POST",
      body: fd
    });

    if (res.ok) {
      document.getElementById("contact-submit-button").textContent = "Thank You!";
      form.reset();
    } else {
      document.getElementById("contact-submit-button").textContent = "Submission failed.";
    }
  });
}

