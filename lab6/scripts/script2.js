const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")

        if (slides.children.length == 1) return
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})


function updateCarousel() {
    fetch('../get.php')
        .then(response => response.json())
        .then(data => {
            let newHtml = ''
            for (let i = 0; i < data.data.length; i++) {
                isActive = false

                const imageUrl = data.data[i];

                const slides = document.querySelector("[data-slides]")
                let images = slides.querySelectorAll('.slide img')
                if (images.length) {
                    const activeImg = slides.querySelector("[data-active] img")
                    if (activeImg && imageUrl == activeImg.src) isActive = true;
                }
                let imgHtml = `
            <li class="slide" ${isActive ? 'data-active' : ''}>
                <img
                    src="${imageUrl}"
                    alt="carouselImage"
                    class="carouselImage"
                />  
            </li>        
            `;
                newHtml += imgHtml
            }
            document.querySelector('[data-slides]').innerHTML = newHtml;
            const slides = document.querySelector("[data-slides]")
            const activeSlide = slides.querySelector("[data-active]")
            if (!activeSlide) slides.children[0].dataset.active = true
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}


setInterval(updateCarousel, 5000);

updateCarousel();
