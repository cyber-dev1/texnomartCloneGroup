
async function connectToMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
    } catch (error) {
        throw new Error('Mikrofonga ulanishda xatolik: ' + error.message);
    }
}


async function handleButtonClick() {

    try {
        await connectToMicrophone();
    } catch (error) {
       console.log(error.message);
    }
}

document.getElementById('mic-button').addEventListener('click', handleButtonClick);
