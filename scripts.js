function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(el => {
      const file = el.getAttribute('data-include');
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error('File not found: ' + file);
          return response.text();
        })
        .then(data => {
            el.innerHTML = data;
            let thisPage = location.href.split("/").slice(-1).join("");
            if (file === "news-2026.html" && !(thisPage === "news_full.html"))
            {
                console.log("Hi")
                let no_removed = 0
                const total = el.children.item(6).children.length;
                for (let i = 4; i < total; i++) {
                    // Remove the child from the DOM
                    el.children.item(6).removeChild(el.children.item(6).children.item(i - no_removed));
                    no_removed += 1;
                }
            }

        // Re-scroll to the anchor target if it's now loaded
        if (location.hash) {
          const target = document.querySelector(location.hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      })
        .catch(err => el.innerHTML = '<p style="color:red;">' + err.message + '</p>');
    });
}


function enlargeImage(anchorEl) {
    const img = anchorEl.querySelector('img');
    const fullSrc = img?.dataset.full || img?.src; // fallback just in case
    const modalImg = document.getElementById('modalImage');

    // Clear previous (prevents flashes of old image if opening quickly)
    modalImg.removeAttribute('src');

    // Optional: preserve alt text
    if (img && img.alt) modalImg.alt = img.alt + ' (full size)';

    // Set full-size image
    // Small async gives the modal time to open before loading the big file
    setTimeout(() => { modalImg.src = fullSrc; }, 0);
  }

document.addEventListener('DOMContentLoaded', includeHTML);
document.addEventListener('enlargeImage', enlargeImage);