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