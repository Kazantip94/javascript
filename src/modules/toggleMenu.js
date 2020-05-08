const toggleMenu = () =>{

    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu');

    const hendlerMenu = () =>{
        
        menu.classList.toggle('active-menu');
        
    };

    btnMenu.addEventListener('click', hendlerMenu);

    menu.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('close-btn')) {
            hendlerMenu();
        }else if(target.closest('ul>li')){
            hendlerMenu();
        }
    });    
};

export default toggleMenu;