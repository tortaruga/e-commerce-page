const openMenuBtn = document.getElementById('open-menu');
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
const menuModal = document.getElementById('menu-modal');
const closeMenuBtn = document.getElementById('close-menu');
const everyDamnThing = document.querySelector('*');
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const selectMoreBtn = document.getElementById('select-more');
const selectLessBtn = document.getElementById('select-less');
const quantitySelected = document.getElementById('quantity-selected');
const prevPhotoBtn = document.getElementById('prev-btn');
const nextPhotoBtn = document.getElementById('next-btn');
const mainPhoto = document.getElementById('main-photo');
const thumbnails = document.querySelectorAll('.product-photos .photo-gallery img')
const cartBtn = document.getElementById('cart'); 
const cartMenu = document.querySelector('.cart-menu');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const prevPhotoLightboxBtn = document.getElementById('prev-btn-lightbox');
const nextPhotoLightboxBtn = document.getElementById('next-btn-lightbox');
const mainPhotoLightbox = document.getElementById('main-photo-lightbox');
const thumbnailsLightbox = document.querySelectorAll('#lightbox .photo-gallery img')
const quantityAdded = document.getElementById('quantity');
const total = document.getElementById('total');
const numberIconCart = document.querySelector('.cart-num-icon');
const emptyCartContent = document.querySelector('.empty');
const fullCartContent = document.querySelector('.full');
const deleteCartBtn = document.getElementById('delete-cart');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('close-lightbox');

const pics = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg',
]

openMenuBtn.addEventListener('click', () => {
   menuModal.show();
   handleBackdrop();
  })

closeMenuBtn.addEventListener('click', () => {
    menuModal.close();
   handleBackdrop();
})

function handleBackdrop() {
    nav.classList.toggle('backdrop');
    main.classList.toggle('backdrop');
}

let quantity = 0;

selectLessBtn.addEventListener('click', getLess);
selectMoreBtn.addEventListener('click', getMore);

function getLess() {
    quantity--;
    updateQuantity();
}

function getMore() {
    quantity++;
    updateQuantity();
}

function updateQuantity() {
    if (quantity < 0) {
        quantity = 0;
    }

    quantitySelected.innerHTML = quantity;
}

let photoIndex = 0;

prevPhotoBtn.addEventListener('click', () => {
    showPrevPhoto(mainPhoto);
});
nextPhotoBtn.addEventListener('click', () => {
    showNextPhoto(mainPhoto)
});


prevPhotoLightboxBtn.addEventListener('click', () => {
    showPrevPhoto(mainPhotoLightbox);
})

nextPhotoLightboxBtn.addEventListener('click', () => {
    showNextPhoto(mainPhotoLightbox);
})


function showPrevPhoto(img) {
    photoIndex--;
    if (photoIndex < 0) {
        photoIndex = pics.length - 1;
    }
    updatePhoto(photoIndex, img);
}

function showNextPhoto(img) {
    photoIndex++;
    if (photoIndex > pics.length - 1) {
        photoIndex = 0;
    }
    updatePhoto(photoIndex, img);
}

function updatePhoto(index, img) {
    img.src = pics[index];
}



thumbnails.forEach(img => {
    img.addEventListener('click', (e) => {
        thumbnails.forEach(sibling => {
            sibling.classList.remove('photo-selected');
        })  
        e.target.classList.add('photo-selected');
        photoIndex = Array.from(thumbnails).indexOf(e.target);
        updatePhoto(photoIndex, mainPhoto);
    })
})

thumbnailsLightbox.forEach(img => {
    img.addEventListener('click', (e) => {
        thumbnailsLightbox.forEach(sibling => {
            sibling.classList.remove('photo-selected');
        })  
        e.target.classList.add('photo-selected');
        photoIndex = Array.from(thumbnailsLightbox).indexOf(e.target);
        updatePhoto(photoIndex, mainPhotoLightbox);
    })
})

let itemsInCart = 0;

cartBtn.addEventListener('click', () => {
   cartMenu.classList.toggle('show');

   let totalCost = itemsInCart * 125.00; 
   total.textContent = "$" + totalCost + ".00"; 
   quantityAdded.textContent = itemsInCart + " ";
})

addToCartBtn.addEventListener('click', () => { 
 numberIconCart.textContent = Number(quantitySelected.textContent);
     numberIconCart.style.visibility = 'visible';
    itemsInCart = Number(quantitySelected.textContent);
    handleCartMenu();
})

function handleCartMenu() {
    if (Number(quantitySelected.textContent) > 0)  {
        emptyCartContent.classList.add('hide');
        fullCartContent.classList.remove('hide');
    } else {
        fullCartContent.classList.add('hide');
        emptyCartContent.classList.remove('hide');
    }
} 


deleteCartBtn.addEventListener('click', () => {
  numberIconCart.style.visibility = 'hidden';
  fullCartContent.classList.add('hide');
  emptyCartContent.classList.remove('hide');
})

mainPhoto.addEventListener('click', () => {
 if (window.innerWidth > 700) {
    lightbox.style.display = 'flex';
    lightbox.showModal();
 }    
})

closeLightbox.addEventListener('click', () => {
    lightbox.close();
    lightbox.style.display = 'none';
})