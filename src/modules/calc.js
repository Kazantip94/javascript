const calc = (price = 100) => {
     
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total'),
        calcItem = document.querySelectorAll('.calc-item');


    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
        
        if((calcCount.value == 0 && calcCount.value !== '' ) || (calcDay.value == 0 && calcDay.value !== '' ) ) {
            totalValue.textContent = "0";
            return;
        }

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        }else if(calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
        
        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        totalValue.textContent = Math.trunc(total);
    };

    calcItem.forEach(item  => {
        item.addEventListener('input', function () {
            // this.value = this.value.replace(/[^0-9+\.]/, '');
            this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
        });
    });

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if(target.matches('select') || target.matches('input')) {

            countSum();

        }
    });
    
};

export default calc;