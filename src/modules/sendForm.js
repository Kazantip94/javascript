const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll('form'),
        phone = document.querySelectorAll('.form-phone'),
        name = document.querySelectorAll('.form-name'),
        message = document.getElementById('form2-message');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color:#fff;';

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        });

      };

    form.forEach(item => {

        //Валидация формы
        item.addEventListener('input', function() {
            message.value = message.value.replace(/[^А-ЯЁ\s]/i, '');
            for(let i = 0; i < phone.length; i++) {
                if(phone !== i){
                    phone[i].value = phone[i].value.replace(/[^0-9+]/, '');
                }else{
                    console.log('Введите цыфри: ');
                }
            }
            for(let j = 0; j < name.length; j++) {
                if(name !== j){
                    name[j].value = name[j].value.replace(/[^А-ЯЁ\s]/i, '');
                }else{
                    console.log('Введите буквы: ');
                }
            }
        });
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(item);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });
    

            postData(body)
                .then((response) => {
                    if(response.status !== 200){
                        throw new Error('status network not 200');
                    }

                    statusMessage.textContent = successMessage;
                    setTimeout(() =>{
                        statusMessage.textContent = '';
                    },3000);
                })
                .catch(() => {
                    statusMessage.textContent = errorMessage;
                    setTimeout(() =>{
                        statusMessage.textContent = '';
                    },3000);
                })
                .finally(() => {
                    item.querySelectorAll('input').forEach(item => item.value = '');
                });

            });
    });
};

export default sendForm;