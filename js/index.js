// Button category load
const loadAllCategories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        const data = await res.json()
        displayCategories(data.categories)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

// Active btn color remove
const removeActiveBtnColor = () => {
    const buttons = document.getElementsByClassName('btn-category')
    for (let btn of buttons) {
        btn.classList.remove('btn-color')
    }
}

// Pets by Category & active btn
const loadPetsByCategory = async (petName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveBtnColor()
            const activeBtn = document.getElementById(`btn-${petName}`)
            activeBtn.classList.add('btn-color')
            displayAllPets(data.data)
        })
        .catch((error) => console.log(error))
}

// Create Button category
const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('button-category')
    categories.forEach(category => {
        const di = document.createElement('div')
        di.innerHTML = `
        <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn btn-category bg-slate-50"><span><img class="w-8 h-8" src="${category.category_icon}}" alt=""></span><span>${category.category}</span></button>
        `
        buttonContainer.append(di)
    })
}

// All pets load
const loadAllPets = async () => {
    document.getElementById('spinner').style.display = ('none')
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        const data = await res.json()
        displayAllPets(data.pets)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

// sorting by price
const loadAllPrice = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        const data = await res.json()
        loadPrice(data.pets)
    }
    catch (error) {
        console.log('Error:', error)
    }
}
const loadPrice = (dataPets) => {
    dataPets.sort((a, b) => b.price - a.price);
    displayAllPets(dataPets);
}

// all pets display
const displayAllPets = (data) => {
    const petShowContainer = document.getElementById('all-pets')
    petShowContainer.innerHTML = ''
    // handleSpinner()
    if (data.length === 0) {
        petShowContainer.classList.remove('grid')
        petShowContainer.innerHTML = `
         <div class="flex flex-col justify-center items-center bg-[#F8F8F8] p-10 rounded-lg space-y-4 mb-10">
            <img class="w-40 h-40" src="./images/error.webp" alt="">
          <h2 class="font-bold text-4xl">No Information Available</h2>
          <p class='text-gray-500'>Adopting a child is a beautiful journey that involves several key
            steps. From the initial decision to adopt, to preparing your home, completing the necessary paperwork, and finally welcoming your new family member, each phase is important.</p>
        </div>
        `
        return;
    }
    else {
        petShowContainer.classList.add('grid')
    }
    data.forEach(pet => {
        const divContainer = document.createElement('div')
        divContainer.innerHTML = `
        <div class="border border-slate-400 p-4 rounded-md space-y-2 mb-10">
    <img class="w-full h-40 rounded-md"
    src="${pet.image}"alt="Pets" />
    <h4 class="font-bold text-xl">${pet.pet_name}</h4>
    <p class="text-gray-500"><i class="fa-solid fa-dice-four"></i> Breed: ${pet.breed || 'Not Available'}</p>
    <p class="text-gray-500"><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth || 'Not Available'}</p>
    <p class="text-gray-500"><i class="fa-solid fa-venus"></i> Gender: ${pet.gender || 'Not Mentioned'}</p>
    <p class="text-gray-500">$ Price: ${pet.price || 'Not Mentioned'}</p>
    <hr class="border border-stone-300">
    <div class="flex gap-1 lg:gap-6 justify-center">
        <button onclick="loadLikeButton('${pet.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
        <button onclick="adoptBtn(this)" id="${pet.petId}" class="btn">Adopt</button>
        <button onclick='loadShowModal("${pet.petId}")' class="btn">Details</button>
    </div>
</div>
        `
        petShowContainer.append(divContainer)
    })
}

// Details button click then load the modal
const loadShowModal = async (petId) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        const data = await res.json()
        showModalDisplay(data.petData)
    }
    catch (error) {
        console.log('Error:', error)
    }

}

// Details button click then show modal display
const showModalDisplay = (petData) => {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
    <img class='w-full rounded-md' src="${petData.image}" alt="">
<h3 class="text-lg font-bold">${petData.pet_name}</h3>
<div class="flex gap-10">
    <div class="mb-3">
        <p class="space-y-2 text-gray-500 text-xs"><i class="fa-solid fa-dice-four"></i> Breed: ${petData.breed}</p>
        <p class="space-y-2 text-gray-500 text-xs"><i class="fa-solid fa-venus"></i> Gender: ${petData.gender}</p>
        <p class="space-y-2 text-gray-500 text-xs"><i class="fa-solid fa-syringe"></i> Vaccinated status: ${petData.vaccinated_status}</p>
    </div>
    <div>
        <p class="space-y-2 text-gray-500 text-xs"><i class="fa-regular fa-calendar"></i> Birth: ${petData.date_of_birth || 'Not Available'}</p>
        <p class="space-y-2 text-gray-500 text-xs">$ Price: ${petData.price}</p>
    </div>
</div>
<p class="space-y-2 font-bold text-xl">Details Information</p>
<p class="space-y-2 text-gray-500 text-xs">${petData.pet_details}</p>
<div class="modal-action">
    <form method="dialog">
        <button class="btn">Close !</button>
    </form>
</div>
    `
    document.getElementById('my_modal_5').showModal()
}

// Adopt button click then show modal
const adoptBtn = (button) => {
    console.log(button)
    const countDown = document.getElementById('countdown')
    const modal = document.getElementById('my_modal_1')
    let count = 3
    modal.showModal()
    const interval = setInterval(() => {
        if (count > 0) {
            countDown.innerText = count;
            count--;
        } else {
            clearInterval(interval);
            modal.close();
            button.textContent = "Adopted";
            button.disabled = true
        }
    }, 1000);
}

// Like button click then image show
const loadLikeButton = (img) => {
    const likeButtonClick = document.getElementById('like-buttonClick')
    likeButtonClick.classList.remove('hidden')
    const divCreate = document.createElement('div')
    divCreate.innerHTML = `
    <div class="border border-slate-400 p-3 rounded-lg">
        <img class="rounded-md" src="${img}" alt="Pets" />
    </div>
    `
    likeButtonClick.append(divCreate)
}

// spinner loading
const handleSpinner = () => {
    document.getElementById('spinner').style.display = ('block')
    setTimeout(() => {
        loadAllPets()
        // document.getElementById('spinner').style.display = ('none')
    }, 2000)
}

// View More click scrolls down to the “Adopt Your Best Friend” section
const viewMore = () => {
    document.getElementById('adopt-section').scrollIntoView({ behavior: 'smooth' });
}

// declare loadAllCategories
loadAllCategories();

// declare handleSpinner
// loadAllPets()
handleSpinner()
