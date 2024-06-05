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
        { id: 1, title: 'The Witcher 3: Wild Hunt', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png', description: 'Action RPG game set in a fantasy universe.' },
        { id: 2, title: 'Cyberpunk 2077', category: 'RPG', platform: 'PC', price: 499, rating: 4, image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg?t=1643031433', description: 'Open-world RPG set in a dystopian future.' },
        { id: 3, title: 'Red Dead Redemption 2', category: 'Action', platform: 'PlayStation', price: 599, rating: 5, image: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png', description: 'Action-adventure game set in the Wild West.' },
        { id: 4, title: 'FIFA 21', category: 'Sports', platform: 'PlayStation', price: 299, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b8/FIFA21.png/640px-FIFA21.png', description: 'Football simulation game.' },
        { id: 5, title: 'Assassin\'s Creed Valhalla', category: 'Action', platform: 'Xbox', price: 499, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/2/26/AC_Valhalla_standard_edition.jpg', description: 'Action RPG set in the Viking era.' },
        { id: 6, title: 'Halo Infinite', category: 'Action', platform: 'Xbox', price: 499, rating: 4, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg?t=1617746839', description: 'First-person shooter set in the Halo universe.' },
        { id: 7, title: 'Forza Horizon 4', category: 'Racing', platform: 'Xbox', price: 399, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/5/5f/Forza_Horizon_4_coverart.jpg/274px-Forza_Horizon_4_coverart.jpg', description: 'Open-world racing game.' },
        { id: 8, title: 'The Legend of Zelda: Breath of the Wild', category: 'RPG', platform: 'Switch', price: 599, rating: 5, image: 'https://images.prom.ua/1946707276_w640_h640_the-legend-of.jpg', description: 'Open-world action-adventure game.' },
        { id: 9, title: 'Super Mario Odyssey', category: 'Platformer', platform: 'Switch', price: 499, rating: 5, image: 'https://static.posters.cz/image/750/%D0%9F%D0%BB%D0%B0%D0%BA%D0%B0%D1%82%D0%B8/super-mario-odyssey-collage-i50045.jpg', description: '3D platformer game featuring Mario.' },
        { id: 10, title: 'Mortal Kombat 11', category: 'Fighting', platform: 'PlayStation', price: 399, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/ru/4/4e/Mortal_Kombat_11.jpg', description: 'Fighting game with various characters and fatalities.' },
        { id: 11, title: 'Call of Duty: Modern Warfare', category: 'Shooter', platform: 'PC', price: 499, rating: 4, image: 'https://static.wikia.nocookie.net/callofduty/images/3/37/Call_of_Duty_Cover.jpg/revision/latest/scale-to-width-down/1200?cb=20220621205425', description: 'First-person shooter set in modern times.' },
        { id: 12, title: 'Battlefield V', category: 'Shooter', platform: 'PC', price: 399, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/ru/5/59/BFV_Standard_Edition.png', description: 'First-person shooter set during World War II.' },
        { id: 13, title: 'Overwatch', category: 'Shooter', platform: 'PC', price: 299, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/uk/7/7b/Overwatch_poster.jpg', description: 'Team-based multiplayer first-person shooter.' },
        { id: 14, title: 'Minecraft', category: 'Simulation', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png', description: 'Sandbox game where you can build and explore worlds.' },
        { id: 15, title: 'Among Us', category: 'Party', platform: 'PC', price: 99, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg', description: 'Multiplayer game of teamwork and betrayal.' },
        { id: 16, title: 'Fortnite', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-272x380.jpg', description: 'Battle royale game.' },
        { id: 17, title: 'Apex Legends', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg', description: 'Battle royale game with unique characters.' },
        { id: 18, title: 'Rainbow Six Siege', category: 'Shooter', platform: 'PC', price: 399, rating: 4, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202210/2019/at0SahvPr4sGm3KX42HDFI1K.jpg', description: 'Tactical shooter game with destructible environments.' },
        { id: 19, title: 'Resident Evil Village', category: 'Horror', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202101/0812/FkzwjnJknkrFlozkTdeQBMub.png', description: 'Survival horror game.' },
        { id: 20, title: 'Genshin Impact', category: 'RPG', platform: 'PC', price: 0, rating: 4, image: 'https://cdn1.epicgames.com/offer/879b0d8776ab46a59a129983ba78f0ce/genshintall_1200x1600-4a5697be3925e8cb1f59725a9830cafc', description: 'Open-world action RPG.' },
        { id: 21, title: 'Dota 2', category: 'MOBA', platform: 'PC', price: 0, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg/266px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg', description: 'Multiplayer online battle arena game.' },
        { id: 22, title: 'League of Legends', category: 'MOBA', platform: 'PC', price: 0, rating: 5, image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S2_1200x1600-905a96cea329205358868f5871393042', description: 'Multiplayer online battle arena game.' },
        { id: 23, title: 'Valorant', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://m.media-amazon.com/images/M/MV5BNmNhM2NjMTgtNmIyZC00ZmVjLTk4YWItZmZjNGY2NThiNDhkXkEyXkFqcGdeQXVyODU4MDU1NjU@._V1_.jpg', description: 'Team-based tactical shooter game.' },
        { id: 24, title: 'Hades', category: 'Roguelike', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202104/0517/9AcM3vy5t77zPiJyKHwRfnNT.png', description: 'Action roguelike game set in the underworld.' },
        { id: 25, title: 'Animal Crossing: New Horizons', category: 'Simulation', platform: 'Switch', price: 599, rating: 5, image: 'https://content.rozetka.com.ua/goods/images/big/28588392.jpg', description: 'Simulation game where you can build and manage your own island.' },
        { id: 26, title: 'Ghost of Tsushima', category: 'Action', platform: 'PlayStation', price: 599, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/b/b6/Ghost_of_Tsushima.jpg', description: 'Action-adventure game set in feudal Japan.' },
        { id: 27, title: 'Sekiro: Shadows Die Twice', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg', description: 'Action-adventure game set in feudal Japan.' },
        { id: 28, title: 'Persona 5', category: 'RPG', platform: 'PlayStation', price: 499, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Persona_5_cover_art.jpg/220px-Persona_5_cover_art.jpg', description: 'Japanese role-playing game.' },
        { id: 29, title: 'Nier: Automata', category: 'Action', platform: 'PC', price: 399, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f8/NieR_Automata_cover.jpg/640px-NieR_Automata_cover.jpg', description: 'Action RPG set in a post-apocalyptic world.' },
        { id: 30, title: 'Dark Souls III', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/cdn/EP0700/CUSA03365_00/OFMeAw2KhrdaEZAjW1f3tCIXbogkLpTC.png', description: 'Action RPG known for its difficulty.' },
        { id: 31, title: 'Bloodborne', category: 'Action', platform: 'PlayStation', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2614/NVmnBXze9ElHzU6SmykrJLIV.png', description: 'Action RPG known for its difficulty.' },
        { id: 32, title: 'Horizon Zero Dawn', category: 'Action', platform: 'PC', price: 499, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/9/93/Horizon_Zero_Dawn.jpg/640px-Horizon_Zero_Dawn.jpg', description: 'Action RPG set in a post-apocalyptic world.' },
        { id: 33, title: 'DOOM Eternal', category: 'Shooter', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202010/0114/b4Q1XWYaTdJLUvRuALuqr0wP.png', description: 'First-person shooter with fast-paced action.' },
        { id: 34, title: 'Cuphead', category: 'Platformer', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/cfn/11307fd0s0uyV-ba4dy5E9qskf6CIntl28sAerYTFbYC7vPUBrfgp7zokliHVbVoJ5ghylOBamo2Q2i5pbEYxQKFnSsiLHaY.png', description: 'Run and gun platformer with hand-drawn animation.' },
        { id: 35, title: 'Celeste', category: 'Platformer', platform: 'PC', price: 199, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Celeste_box_art_full.png', description: 'Platformer about climbing a mountain.' },
        { id: 36, title: 'Hollow Knight', category: 'Action', platform: 'PC', price: 299, rating: 5, image: 'https://image.api.playstation.com/cdn/EP1805/CUSA13285_00/DmwPWlU0468FbsjrtI92FhQz1xBYMoog.png', description: 'Metroidvania action-adventure game.' },
        { id: 37, title: 'Ori and the Will of the Wisps', category: 'Platformer', platform: 'PC', price: 299, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/b/b2/Ori_and_the_Blind_Forest_Logo.jpg', description: 'Platform-adventure Metroidvania game.' },
        { id: 38, title: 'Stardew Valley', category: 'Simulation', platform: 'PC', price: 199, rating: 5, image: 'https://gaming-cdn.com/images/products/1767/orig-fallback-v1/stardew-valley-pc-mac-game-steam-cover.jpg?v=1704800467', description: 'Farming simulation game.' },
        { id: 39, title: 'Terraria', category: 'Adventure', platform: 'PC', price: 199, rating: 5, image: 'https://m.media-amazon.com/images/I/815a-OjJ0SL._AC_UF1000,1000_QL80_.jpg', description: 'Sandbox adventure game with building and exploration.' },
        { id: 40, title: 'The Sims 4', category: 'Simulation', platform: 'PC', price: 299, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/ru/5/5e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_The_Sims_4.jpeg', description: 'Life simulation game where you create and control people.' },
        { id: 41, title: 'Civilization VI', category: 'Strategy', platform: 'PC', price: 499, rating: 5, image: 'https://image.api.playstation.com/vulcan/img/cfn/11307KFcs3gBlcheONy-ZOYZ5kplFnq5jXinUSI8HkCc8P2gdI1_32JrKJ-vxns32LjXBcQteG2EOwuzWS_KXqE5VCYFmS4Z.png', description: 'Turn-based strategy game where you build an empire.' },
        { id: 42, title: 'XCOM 2', category: 'Strategy', platform: 'PC', price: 399, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/c/c3/XCOM_2_cover_art.jpg', description: 'Turn-based tactical game.' },
        { id: 43, title: 'Divinity: Original Sin 2', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://image.api.playstation.com/cdn/EP3383/CUSA11898_00/qCNa6hRH1XzGkRoUdKnNS0Zon3GMomx3.png', description: 'Role-playing game with turn-based combat.' },
        { id: 44, title: 'Baldur\'s Gate 3', category: 'RPG', platform: 'PC', price: 599, rating: 5, image: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg', description: 'Role-playing game with turn-based combat.' },
        { id: 45, title: 'The Elder Scrolls V: Skyrim', category: 'RPG', platform: 'PC', price: 399, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/uk/1/15/The_Elder_Scrolls_V_Skyrim_cover.png', description: 'Open-world action RPG.' },
        { id: 46, title: 'The Elder Scrolls Online', category: 'RPG', platform: 'PC', price: 199, rating: 4, image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2319/Lqb6J5FyVHn2nOCpmiTAKi25.jpg', description: 'Massively multiplayer online RPG.' },
        { id: 47, title: 'World of Warcraft', category: 'RPG', platform: 'PC', price: 0, rating: 5, image: 'https://upload.wikimedia.org/wikipedia/ru/8/8e/World_of_Warcraft_Box_Cover_Art.jpg', description: 'Massively multiplayer online RPG.' },
        { id: 48, title: 'EVE Online', category: 'RPG', platform: 'PC', price: 0, rating: 5, image: 'https://cdn2.unrealengine.com/eve-online-1920x1080-63abdd7114f4.png', description: 'Massively multiplayer online RPG set in space.' },
        { id: 49, title: 'Destiny 2', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/uk/thumb/0/04/%D0%9E%D0%B1%D0%BA%D0%BB%D0%B0%D0%B4%D0%B8%D0%BD%D0%BA%D0%B0_%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%D0%B3%D1%80%D0%B8_Destiny_2.jpg/250px-%D0%9E%D0%B1%D0%BA%D0%BB%D0%B0%D0%B4%D0%B8%D0%BD%D0%BA%D0%B0_%D0%B2%D1%96%D0%B4%D0%B5%D0%BE%D0%B3%D1%80%D0%B8_Destiny_2.jpg', description: 'Online-only multiplayer first-person shooter.' },
        { id: 50, title: 'Warframe', category: 'Shooter', platform: 'PC', price: 0, rating: 4, image: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Warframe_Cover_Art.png', description: 'Online multiplayer third-person shooter.' }
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
