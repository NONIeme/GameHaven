document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const platformFilter = document.getElementById('platform-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const cartIcon = document.getElementById('cart-icon');
    const cartPanel = document.getElementById('cart-panel');
    const closeCartButton = document.getElementById('close-cart');
    const buyCartButton = document.getElementById('buy-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const gameInfoModal = document.getElementById('game-info-modal');
    const closeGameInfoModal = document.querySelector('.close-modal');
    const gameTitle = document.getElementById('game-title');
    const gameDescription = document.getElementById('game-description');
    const gamePrice = document.getElementById('game-price');
    const registrationModal = document.getElementById('registration-modal');
    const closeRegistrationModal = registrationModal.querySelector('.close-modal');
    const registrationForm = document.getElementById('registration-form');
    let cartCount = 0;
    let cart = [];
    let isUserRegistered = false;

    // Sample game data
     const games = [
        { id: 1, title: 'The Witcher 3: Wild Hunt', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/N55cR4oXrAXObhG8mTg56zP7uJQlDLF7.png', description: 'Action RPG game set in a fantasy universe.' },
        { id: 2, title: 'Cyberpunk 2077', category: 'RPG', platform: 'PC', price: 499, rating: 4, image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg?t=1643031433', description: 'Open-world RPG set in a dystopian future.' },
        { id: 3, title: 'Red Dead Redemption 2', category: 'Action', platform: 'PlayStation', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action-adventure game set in the Wild West.' },
        { id: 4, title: 'FIFA 21', category: 'Sports', platform: 'PlayStation', price: 299, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Football simulation game.' },
        { id: 5, title: 'Assassin\'s Creed Valhalla', category: 'Action', platform: 'Xbox', price: 499, rating: 5, image: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fassassins-creed%2Fhome%2FEGS_ASSASSINSCREEDVALHALLA_UBISOFT_S3-2560x1440-3a3ffb6f9c0a5d0b6df1ea7d9d00bb8f4cbf87a4.jpg', description: 'Action RPG set in the Viking era.' },
        { id: 6, title: 'Halo Infinite', category: 'Action', platform: 'Xbox', price: 499, rating: 4, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg?t=1617746839', description: 'First-person shooter set in the Halo universe.' },
        { id: 7, title: 'Forza Horizon 4', category: 'Racing', platform: 'Xbox', price: 399, rating: 5, image: 'https://cdn1.epicgames.com/offer/9edcec8705e041389fe6b40c0f5738b6/EGS_ForzaHorizon4_PlaygroundGames_S3-2560x1440-3f960d42b6edb405adfc1e8a4b99e8d2.jpg', description: 'Open-world racing game.' },
        { id: 8, title: 'The Legend of Zelda: Breath of the Wild', category: 'RPG', platform: 'Switch', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Open-world action-adventure game.' },
        { id: 9, title: 'Super Mario Odyssey', category: 'Platformer', platform: 'Switch', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: '3D platformer game featuring Mario.' },
        { id: 10, title: 'Mortal Kombat 11', category: 'Fighting', platform: 'PlayStation', price: 399, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Fighting game with various characters and fatalities.' },
        { id: 11, title: 'Call of Duty: Modern Warfare', category: 'Shooter', platform: 'PC', price: 499, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'First-person shooter set in modern times.' },
        { id: 12, title: 'Battlefield V', category: 'Shooter', platform: 'PC', price: 399, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'First-person shooter set during World War II.' },
        { id: 13, title: 'Overwatch', category: 'Shooter', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Team-based multiplayer first-person shooter.' },
        { id: 14, title: 'Minecraft', category: 'Simulation', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Sandbox game where you can build and explore worlds.' },
        { id: 15, title: 'Among Us', category: 'Party', platform: 'PC', price: 99, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Multiplayer game of teamwork and betrayal.' },
        { id: 16, title: 'Fortnite', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Battle royale game.' },
        { id: 17, title: 'Apex Legends', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Battle royale game with unique characters.' },
        { id: 18, title: 'Rainbow Six Siege', category: 'Shooter', platform: 'PC', price: 399, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Tactical shooter game with destructible environments.' },
        { id: 19, title: 'Resident Evil Village', category: 'Horror', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Survival horror game.' },
        { id: 20, title: 'Genshin Impact', category: 'RPG', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Open-world action RPG.' },
        { id: 21, title: 'Dota 2', category: 'MOBA', platform: 'PC', price: 0, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Multiplayer online battle arena game.' },
        { id: 22, title: 'League of Legends', category: 'MOBA', platform: 'PC', price: 0, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Multiplayer online battle arena game.' },
        { id: 23, title: 'Valorant', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Team-based tactical shooter game.' },
        { id: 24, title: 'Hades', category: 'Roguelike', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action roguelike game set in the underworld.' },
        { id: 25, title: 'Animal Crossing: New Horizons', category: 'Simulation', platform: 'Switch', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Simulation game where you can build and manage your own island.' },
        { id: 26, title: 'Ghost of Tsushima', category: 'Action', platform: 'PlayStation', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action-adventure game set in feudal Japan.' },
        { id: 27, title: 'Sekiro: Shadows Die Twice', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action-adventure game set in feudal Japan.' },
        { id: 28, title: 'Persona 5', category: 'RPG', platform: 'PlayStation', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Japanese role-playing game.' },
        { id: 29, title: 'Nier: Automata', category: 'Action', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action RPG set in a post-apocalyptic world.' },
        { id: 30, title: 'Dark Souls III', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action RPG known for its difficulty.' },
        { id: 31, title: 'Bloodborne', category: 'Action', platform: 'PlayStation', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action RPG known for its difficulty.' },
        { id: 32, title: 'Horizon Zero Dawn', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Action RPG set in a post-apocalyptic world.' },
        { id: 33, title: 'DOOM Eternal', category: 'Shooter', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'First-person shooter with fast-paced action.' },
        { id: 34, title: 'Cuphead', category: 'Platformer', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Run and gun platformer with hand-drawn animation.' },
        { id: 35, title: 'Celeste', category: 'Platformer', platform: 'PC', price: 199, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Platformer about climbing a mountain.' },
        { id: 36, title: 'Hollow Knight', category: 'Action', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Metroidvania action-adventure game.' },
        { id: 37, title: 'Ori and the Will of the Wisps', category: 'Platformer', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Platform-adventure Metroidvania game.' },
        { id: 38, title: 'Stardew Valley', category: 'Simulation', platform: 'PC', price: 199, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Farming simulation game.' },
        { id: 39, title: 'Terraria', category: 'Adventure', platform: 'PC', price: 199, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Sandbox adventure game with building and exploration.' },
        { id: 40, title: 'The Sims 4', category: 'Simulation', platform: 'PC', price: 299, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Life simulation game where you create and control people.' },
        { id: 41, title: 'Civilization VI', category: 'Strategy', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Turn-based strategy game where you build an empire.' },
        { id: 42, title: 'XCOM 2', category: 'Strategy', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Turn-based tactical game.' },
        { id: 43, title: 'Divinity: Original Sin 2', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Role-playing game with turn-based combat.' },
        { id: 44, title: 'Baldur\'s Gate 3', category: 'RPG', platform: 'PC', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Role-playing game with turn-based combat.' },
        { id: 45, title: 'The Elder Scrolls V: Skyrim', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Open-world action RPG.' },
        { id: 46, title: 'The Elder Scrolls Online', category: 'RPG', platform: 'PC', price: 199, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Massively multiplayer online RPG.' },
        { id: 47, title: 'World of Warcraft', category: 'RPG', platform: 'PC', price: 0, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Massively multiplayer online RPG.' },
        { id: 48, title: 'EVE Online', category: 'RPG', platform: 'PC', price: 0, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Massively multiplayer online RPG set in space.' },
        { id: 49, title: 'Destiny 2', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Online-only multiplayer first-person shooter.' },
        { id: 50, title: 'Warframe', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/1920/6v7NmG2qzDqZZmKwhYfqTOsv.png', description: 'Online multiplayer third-person shooter.' }
    ];

   

    // Filter and search function
    function filterAndSearchGames() {
        const query = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedPlatform = platformFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedRating = ratingFilter.value;

        let results = games.filter(game => {
            const matchesQuery = game.title.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === '' || game.category === selectedCategory;
            const matchesPlatform = selectedPlatform === '' || game.platform === selectedPlatform;
            const matchesRating = selectedRating === '' || game.rating >= parseInt(selectedRating);
            return matchesQuery && matchesCategory && matchesPlatform && matchesRating;
        });

        if (selectedPrice === 'lowest') {
            results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (selectedPrice === 'highest') {
            results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        displayResults(results);
    }

    // Display search results
    function displayResults(results) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            mainContent.innerHTML = '<p>Ігор не знайдено.</p>';
        } else {
            const resultList = document.createElement('div');
            resultList.className = 'product-grid';

            results.forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'product-item';
                gameItem.innerHTML = `
                    <img src="${game.image}" alt="${game.title}">
                    <h3>${game.title}</h3>
                    <p>₴${game.price}</p>
                    <p>Рейтинг: ${'★'.repeat(game.rating)}</p>
                    <button class="add-to-cart" data-id="${game.id}">До кошика</button>
                    <button class="view-details" data-id="${game.id}">Деталі</button>
                `;
                resultList.appendChild(gameItem);
            });

            mainContent.appendChild(resultList);
        }
    }

    // Add to cart function
    function addToCart(gameId) {
        const game = games.find(game => game.id === gameId);
        if (game) {
            const cartItem = cart.find(item => item.id === gameId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...game, quantity: 1 });
            }
            cartCount++;
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Кошик (${cartCount})`;
            updateCartPanel();
        }
    }

    // Remove from cart function
    function removeFromCart(gameId) {
        const cartItemIndex = cart.findIndex(item => item.id === gameId);
        if (cartItemIndex > -1) {
            cartCount -= cart[cartItemIndex].quantity;
            cart.splice(cartItemIndex, 1);
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Кошик (${cartCount})`;
            updateCartPanel();
        }
    }

    // Remove one item from cart function
    function removeOneFromCart(gameId) {
        const cartItem = cart.find(item => item.id === gameId);
        if (cartItem) {
            cartItem.quantity--;
            cartCount--;
            if (cartItem.quantity === 0) {
                cart = cart.filter(item => item.id !== gameId);
            }
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Кошик (${cartCount})`;
            updateCartPanel();
        }
    }

    // Update cart panel
    function updateCartPanel() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.title} (x${item.quantity})</span>
                <button class="remove-one-from-cart" data-id="${item.id}">-</button>
                <button class="remove-from-cart" data-id="${item.id}">Видалити</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = totalAmount.toFixed(2);
    }

    // Event listeners
    searchButton.addEventListener('click', filterAndSearchGames);
    categoryFilter.addEventListener('change', filterAndSearchGames);
    platformFilter.addEventListener('change', filterAndSearchGames);
    priceFilter.addEventListener('change', filterAndSearchGames);
    ratingFilter.addEventListener('change', filterAndSearchGames);

    cartIcon.addEventListener('click', () => {
        cartPanel.style.display = 'flex';
    });

    closeCartButton.addEventListener('click', () => {
        cartPanel.style.display = 'none';
    });

    buyCartButton.addEventListener('click', () => {
        if (!isUserRegistered) {
            registrationModal.style.display = 'flex';
        } else {
            alert('Дякуємо за покупку!');
            cart = [];
            cartCount = 0;
            cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i> Кошик (0)';
            updateCartPanel();
            cartPanel.style.display = 'none';
        }
    });

    closeGameInfoModal.addEventListener('click', () => {
        gameInfoModal.style.display = 'none';
    });

    closeRegistrationModal.addEventListener('click', () => {
        registrationModal.style.display = 'none';
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        isUserRegistered = true;
        registrationModal.style.display = 'none';
        alert('Реєстрація успішна! Тепер ви можете завершити покупку.');
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            addToCart(gameId);
        }
        if (event.target.classList.contains('remove-from-cart')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(gameId);
        }
        if (event.target.classList.contains('remove-one-from-cart')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            removeOneFromCart(gameId);
        }
        if (event.target.classList.contains('view-details')) {
            const gameId = parseInt(event.target.getAttribute('data-id'));
            const game = games.find(g => g.id === gameId);
            if (game) {
                gameTitle.textContent = game.title;
                gameDescription.textContent = game.description;
                gamePrice.textContent = `₴${game.price}`;
                gameInfoModal.style.display = 'flex';
            }
        }
    });

    // Initial display of all games
    filterAndSearchGames();
});
