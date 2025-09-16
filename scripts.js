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
            if (file === "news-2025.html" && !(thisPage === "news_full.html"))
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


function enlargeImage(el) {
    const img = el.querySelector('img');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
}

document.addEventListener('DOMContentLoaded', includeHTML);
document.addEventListener('enlargeImage', enlargeImage);