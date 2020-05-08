const ourTeam = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    let src;
    commandPhoto.forEach(item => {
        item.addEventListener('mouseover', function() {
            src = this.src;
            this.src = this.dataset.img;
        });
        item.addEventListener('mouseout', function() {
            this.src = src;
        });
    });
};

export default ourTeam;