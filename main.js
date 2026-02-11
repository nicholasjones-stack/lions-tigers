fetch('https://dog.ceo/api/breeds/list/all').then(function (response) {
    return response.json()
}).then(function (data) {
    console.log(data)
})

// global data
let AllImages
let timer
let currentPosition = 0
let deleteFirstDelay

// get list os breeds
async function onPageLoad() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
        const data = await response.json()
        document.querySelector('#breed').innerHTML = createBreedList(data.message)
    } catch (e) {
        console.log('There was a problem fetching the breed list.')
    }
}

onPageLoad()

function createBreedList(list) {
    return <select class="breed-select" onchange="loadByBreed(this)"><option>Choose a dog breed</option>
    ${Object.keys(list)
        .map(function (item) {
            return <option>${item}</option>
        })
        .join("")}
    </select>
}

async function loadByBreed(el) {
    clearTimeout(deleteFirstDelay)
    clearInterval(timer)
    currentPosition = 0
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${el.value}/images`)
        const data = await response.json()
        populateSlideshow(data.message)
    } catch (e) {
        console.log('There was a problem fetching the breed images.')
    }
}

function createSlideshow(images) {
    AllImages = images

    if (AllImages.length > 1) {
        document.getElementById('slideshow').innerHTML = `
            <div class="slide" style="background-image: url('${Images[0]}')"></div>
            <div class="slide" style="background-image: url('${Images[1]}')"></div>
        `
        currentPosition += 2
        if (AllImages.length === 2) currentPosition = 0

        timer = setInterval(nextSlide, 3000)
    } else {
        document.querySelector('.slideshow').innerHTML = `
            <div class="slide" style="background-image: url('${Images[0]}')"></div>
            <div class="photo"></div>
        `}
    }

function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${Images[currentPosition]}')"></div>`)
    setTimeout(function () {
        document.querySelector(".slide").remove()
    }, 1000)

    if (currentPosition + 1 >= images.length) {
        currentPosition = 0
    } else {
        currentPosition++
    }
}