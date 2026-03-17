
function initializeContactFormListener() {
  document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

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

