const elBasketTovarsList = document.querySelector(".js-basket-tovars-list");
const elTovarsTemp = document.querySelector(".js-tovars-temp").content;
const elSearchBasketForm = document.querySelector(".js-search-basket-tovars-form");
const elBasketSearchInput = document.querySelector(".js-basket-search-input");
const elErrorText = document.querySelector(".js-error-text");
const tovarsBasket = getItem("tovars_basket") ? JSON.parse(getItem("tovars_basket")) : [];
const handleRenderTovarsFn = arr => {
    elBasketTovarsList.innerHTML = "";
    const docFragment = document.createDocumentFragment();
    arr.forEach(({ img, title, credit, price, id, old_price, new_price }) => {
        const clone = elTovarsTemp.cloneNode(true);
        clone.querySelector(".js-tovars-img").src = img;
        clone.querySelector(".js-tovars-title").textContent = title;
        clone.querySelector(".js-tovars-credit-title").textContent = credit;
        clone.querySelector(".js-basket-icon").dataset.id = id;
        const tovarsAddBasketBtn = clone.querySelector(".js-tovars-add-basket-btn");
        tovarsAddBasketBtn.dataset.id = id;
        tovarsAddBasketBtn.textContent = "X"
        if (old_price && new_price) {
            const elTovarsOldPrice = clone.querySelector(".js-tovars-old-price");
            elTovarsOldPrice.classList.remove("d-none");
            elTovarsOldPrice.textContent = old_price + " сўм";
            clone.querySelector(".js-tovars-price").textContent = new_price + " сўм";
        }
        if (!(old_price && new_price)) clone.querySelector(".js-tovars-price").textContent = price + " сўм";
        docFragment.append(clone)
    })
    elBasketTovarsList.append(docFragment);
}
handleRenderTovarsFn(tovarsBasket);

const handleClickFn = evt => {
    let evt_target = evt.target;
    if (evt_target.matches(".js-tovars-add-basket-btn") || evt_target.matches(".js-basket-icon")) {
        evt_target = evt.target.dataset.id;
        const findIndexTovar = tovarsBasket.findIndex(({ id }) => evt_target == id);
        tovarsBasket.splice(findIndexTovar, 1);
        setItem("tovars_basket", tovarsBasket);
        handleRenderTovarsFn(tovarsBasket);
    }
}

elBasketTovarsList.addEventListener("click", handleClickFn);
elSearchBasketForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const search_value = elBasketSearchInput.value.trim();
    if(!search_value) return handleRenderTovarsFn(tovarsBasket);
    const search_value_regex = new RegExp(search_value, "gi");
    const filterTovarsOfSearchValue = tovars.filter(({title}) => title.match(search_value_regex));
    if(!(filterTovarsOfSearchValue && filterTovarsOfSearchValue?.length)) return elErrorText.classList.remove("d-none");
    handleRenderTovarsFn(filterTovarsOfSearchValue);
})