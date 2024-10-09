const elClimetList = document.querySelector(".js-climet-list");
const elXitList = document.querySelector(".js-xit-list");
const elColectionList = document.querySelector(".js-colection-list");
const elTovarsTemp = document.querySelector(".js-tovars-temp").content;


const handleRenderTovarsFn = (arr, { climet, colection, xit }) => {
    if (climet && !(colection && xit)) elClimetList.innerHTML = "";
    if (xit && !(climet && colection)) elXitList.innerHTML = "";
    if (colection && !(climet && xit)) elColectionList.innerHTML = "";
    const docFragment = document.createDocumentFragment();
    arr.forEach(({ img, title, credit, price, id, old_price, new_price }) => {
        const clone = elTovarsTemp.cloneNode(true);
        clone.querySelector(".js-tovars-img").src = img;
        clone.querySelector(".js-tovars-title").textContent = title;
        clone.querySelector(".js-tovars-credit-title").textContent = credit;
        clone.querySelector(".js-tovars-add-basket-btn").dataset.id = id;
        if (old_price && new_price) {
            const elTovarsOldPrice = clone.querySelector(".js-tovars-old-price");
            elTovarsOldPrice.classList.remove("d-none");
            elTovarsOldPrice.textContent = old_price + " сўм";
            clone.querySelector(".js-tovars-price").textContent = new_price + " сўм";
        }
        if (!(old_price && new_price)) clone.querySelector(".js-tovars-price").textContent = price + " сўм";
        docFragment.append(clone)
    })
    if (climet && !(colection && xit)) elClimetList.append(docFragment);
    if (xit && !(climet && colection)) elXitList.append(docFragment);
    if (colection && !(climet && xit)) elColectionList.append(docFragment);
}
handleRenderTovarsFn(tovars.slice(0, 5), { climet: true, colection: false, xit: false });
handleRenderTovarsFn(tovars.slice(5, 10), { climet: false, colection: false, xit: true });
handleRenderTovarsFn(tovars.slice(10, 15), { climet: false, colection: true, xit: false });


















async function connectToMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
    } catch (error) {
        throw new Error('Mikrofonga ulanishda xatolik: ' + error.message);
    }
};

async function handleButtonClick() {

    try {
        await connectToMicrophone();
    } catch (error) {
        console.log(error.message);
    }
};

document.getElementById('mic-button').addEventListener('click', handleButtonClick);
