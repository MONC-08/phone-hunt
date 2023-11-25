const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();

    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // to clear the loaded phone for new search
    phoneContainer.textContent = '';

    // to check the length is greater than 10 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden', true);
    }

    // if not show all then slice 10 device
    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }


    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 shadow-xl p-5`;
        phoneCard.innerHTML = `
        
                    <figure><img src="${phone.image}" alt="" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
    
        `;
        phoneContainer.appendChild(phoneCard);

    });
    toggleSpinner(false);

}

const handleSearch = (isShowAll) => {

    toggleSpinner(true);

    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    loadPhone(searchText, isShowAll);
}

const toggleSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}

const handleShowAll = () => {

    handleSearch(true);
}

const handleShowDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {

    console.log(phone);
    show_details_modal.showModal();

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    <h3 id="show-detail-phone-name" class="font-bold text-xl text-center">${phone.name}</h3>
                    <img src="${phone.image}" alt="" class="block mx-auto">
                    <p class="">Brand: ${phone.brand}</p>
                    <p class="">Display: ${phone?.mainFeatures.displaySize
        }</p>
                    <p class="">Memory: ${phone?.mainFeatures.memory
        }</p>
                    <p class="">GPS: ${phone?.others?.GPS || 'No GPS'
        }</p>
                    <p class="">Release Date: ${phone?.releaseDate || 'Not available'}</p>
                    
    `
}

// loadPhone();