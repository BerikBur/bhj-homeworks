//0 План решения задачи:
//1 Получить все продукты по селектору
//1.1 Получить кнопки уменьшения/увеличения количества товара
//1.2 Получить количество товара
//1.3 Получить кнопку добавить товары
//2 Разработать логику
//2.1 Слушатель события на кнопку уменьшения товара
//2.2 Обработчик события уменьшения
//2.3 Слушатель события на кнопку увеличения товара
//2.4 Обработчик события увеличения
//2.5 Слушатель события на кнопку добавления в корзину
//2.6 Обработчик события === добавить в корзину

const products = document.querySelectorAll('.product');
const cartMain = document.querySelector('.cart');
const cart = document.querySelector('.cart__products');

// Функция для обновления отображения корзины
function updateCartDisplay() {
    cart.innerHTML = '';
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.forEach(item => {
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart__product');
        cartProduct.setAttribute('data-id', item.id);

        const cartImage = document.createElement('img');
        cartImage.classList.add('cart__product-image');
        cartImage.src = item.image;
        cartImage.alt = item.title;

        const cartCount = document.createElement('div');
        cartCount.classList.add('cart__product-count');
        cartCount.textContent = item.count;

        const btnRemoveProduct = document.createElement('div');
        btnRemoveProduct.innerHTML = 'Удалить товар';
        btnRemoveProduct.classList.add('product__add');
        btnRemoveProduct.style.background = 'red';
        btnRemoveProduct.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        cartProduct.append(cartImage, cartCount, btnRemoveProduct);
        cartProduct.style.marginRight = '10px';
        cart.appendChild(cartProduct);
    });

    // Показать корзину, если она не пуста
    cartMain.style.display = cartItems.length > 0 ? 'block' : 'none';
}

// Функция для добавления товара в корзину
function addToCart(productID, image, title, count) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.id === productID);

    if (existingItem) {
        existingItem.count += count; // Увеличиваем количество
    } else {
        cartItems.push({ id: productID, image, title, count }); // Добавляем новый товар
    }

    localStorage.setItem('cart', JSON.stringify(cartItems)); // Сохраняем в localStorage
    updateCartDisplay();
}

// Функция для удаления товара из корзины
function removeFromCart(productID) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== productID);
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Сохраняем изменения
    updateCartDisplay();
}

// Инициализация корзины при загрузке страницы
updateCartDisplay();

products.forEach(product => {
    const productID = product.getAttribute('data-id');
    const decrementProduct = product.querySelector('.product__quantity-control_dec');
    const incrementProduct = product.querySelector('.product__quantity-control_inc');
    const countProduct = product.querySelector('.product__quantity-value');
    const btnAddProduct = product.querySelector('.product__add');
    const imageProduct = product.querySelector('.product__image');
    const titleProduct = product.querySelector('.product__title');

    // Уменьшение количества товара
    decrementProduct.addEventListener('click', () => {
        let currentCount = Number(countProduct.textContent);
        if (currentCount > 1) {
            currentCount -= 1;
            countProduct.textContent = String(currentCount);
        }
    });

    // Увеличение количества товара
    incrementProduct.addEventListener('click', () => {
        let currentCount = Number(countProduct.textContent);
        currentCount += 1;
        countProduct.textContent = String(currentCount);
    });

    // Добавление товара в корзину
    btnAddProduct.addEventListener('click', () => {
        const count = Number(countProduct.textContent);
        addToCart(productID, imageProduct.src, titleProduct.textContent, count);
        
        // Анимация перемещения изображения товара
        const imgRect = imageProduct.getBoundingClientRect();
        const imgClone = imageProduct.cloneNode();
        document.body.appendChild(imgClone);
        imgClone.style.position = 'absolute';
        imgClone.style.transition = 'transform 1s ease';
        imgClone.style.zIndex = 1000;
        imgClone.style.left = `${imgRect.left}px`;
        imgClone.style.top = `${imgRect.top}px`;

        let targetX, targetY;

        const isThisProductExist = cart.querySelector(`.cart__product[data-id='${productID}']`);
        const cartProducts = cart.querySelectorAll('.cart__product');

        if (isThisProductExist) {
            const cartImage = isThisProductExist.querySelector('.cart__product-image');
            const cartImageRect = cartImage.getBoundingClientRect();
            targetX = cartImageRect.left;
            targetY = cartImageRect.top + (cartImageRect.height / 2) - (imgRect.height / 2);
        } else if (cartProducts.length > 0) {
            const lastCartProduct = cartProducts[cartProducts.length - 1];
            const lastCartProductRect = lastCartProduct.getBoundingClientRect();
            targetX = lastCartProductRect.right + 10;
            targetY = lastCartProductRect.top + (lastCartProductRect.height / 2) - (imgRect.height / 2);
        } else {
            const cartRect = cart.getBoundingClientRect();
            targetX = cartRect.left + (cartRect.width / 2) - (imgRect.width / 2);
            targetY = cartRect.bottom - imgRect.height;
        }

        setTimeout(() => {
            imgClone.style.transform = `translate(${targetX - imgRect.left}px, ${targetY - imgRect.top}px)`;
        }, 0);

        imgClone.addEventListener('transitionend', () => {
            imgClone.remove();
        });
    });
});