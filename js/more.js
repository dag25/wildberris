const getAll = () => {
	const moreBtn = document.querySelector('.more');


	const renderGoods = goods => {
		const goodsContainer = document.querySelector('.long-goods-list');
		goodsContainer.innerHTML = '';
		goods.forEach(good => {
			const goodBlock = document.createElement('div');
			goodBlock.classList.add('col-lg-3');
			goodBlock.classList.add('col-sm-6');
			goodBlock.innerHTML = `
					<div class="goods-card">
						<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
						<img src="db/${good.img}" alt=${good.name} class="goods-image">
						<h3 class="goods-title">${good.name}</h3>

						<p class="goods-description">${good.description}</p>

						<button class="button goods-card-btn add-to-cart" data-id=${good.id}>
							<span class="button-price">$${good.price}</span>
						</button>
					</div>
				`;
			goodsContainer.append(goodBlock);
		});
	};

	const getData = () => {
		fetch('https://wildberries-2e68c-default-rtdb.firebaseio.com/db.json')
			.then(response => {
				return response.json();
			})
			.then(data => {
				const array = data;

				localStorage.setItem('goods', JSON.stringify(array));
				if (window.location.pathname !== '/goods.html') {
					window.location.href = '/goods.html';
				} else {
					renderGoods(array);
				}
			});
	};

	try {
		moreBtn.addEventListener('click', event => {
			getData();
		});
	} catch (error) {
		console.error(error.message);
	}
};

getAll();
