let timer
let lastSlidePhotoDelay
async function start() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    dogBreedList(data.message)
}
start()
function dogBreedList(breedList) {
    document.getElementById('breed').innerHTML = `
        <select onchange='fetchBreedImages(this.value)'>
            <option>select a breed</option>
            ${Object.keys(breedList).map(function(breed) {
                return `<option>${breed}</option>`
            })}
        </select>
    `
}
async function fetchBreedImages(breed) {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      const data = await response.json()
      createSlideShow(data.message)   
}
function createSlideShow(images) {
    clearInterval(timer)
    clearTimeout(lastSlidePhotoDelay)
    let currentPosition = 0
    if(images.length > 1) {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide" style="background-image: url('${images[1]}');"></div>
    `
        currentPosition+=2
        if(images.length == 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}');"></div>
        <div class="slide"></div>
    `
    }
    
    function nextSlide() {
        document.getElementById('slideshow').insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`) 
        lastSlidePhotoDelay =   setTimeout(function() {
            document.querySelector('.slide').remove()
        }, 1000)
        if(currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}
