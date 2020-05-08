const togglePopUp = () =>{
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');
    let popUpContent = document.querySelector('.popup-content'),
        left = 0;
    let id;
    

    const frame = () => {

        if(screen.width > 768){
            id = setInterval(frame, 1);
            if(left === 38) {
                    clearInterval(id);
                }else{
                    left++;
                    popUp.style.display = 'block';
                    popUpContent.style.transition = '1s';
                    popUpContent.style.left = left + '%';
                }
        }else{
            popUp.style.display = 'block';
        }

      
    };
    
    popupBtn.forEach((elem) => elem.addEventListener('click', frame));

    popUp.addEventListener('click', (event) =>{
        let target = event.target;

        if(target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
            togglePopUp();

        }else{
            target = target.closest('.popup-content');

            if(!target) {
                popUp.style.display = 'none';
                togglePopUp();
            }
        }
    });
};

export default togglePopUp;