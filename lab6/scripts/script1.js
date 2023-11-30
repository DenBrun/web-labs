function saveDataToServer() {
    const carouselData = document.querySelector('#carouselForm textarea').value.trim().split('\n');
    if (carouselData[0].length == 0) {
        alert("Enter image URLs")
        return
    }

    fetch('../save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: carouselData }),
    });
    // window.location.href = 'index2.html';
}