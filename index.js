
//jadi yang di targetkan adalah "nilai atribute Gkecil".
let a = document.querySelector('.container');
let gambaratas = document.querySelector('.Gatas');
let b = document.querySelectorAll('.Gkecil');
a.onclick = function (e) {
  
    //mencek apakah yang di klik adalah Gkecil
    if (e.target.className == 'Gkecil') {
        gambaratas.src = e.target.src;
        gambaratas.classList.add('fode'); //memberi animasi
        setTimeout (function () {
            gambaratas.classList.remove('fode');
        }, 500)
        
       // e.target.classList.add('active');
        b.forEach(function (re) {
            // if(re.classList.contains('active')) {
            //     re.classList.remove('active');
            // }
            // re.onclick = function (e) {
            //     e.target.classList.remove('active');
            // }
            re.className = 'Gkecil';
            
        });
           
        e.target.classList.add('active');

    }
       
        
};
