const themeBtn = document.querySelector('.change');
themeBtn.addEventListener('click', onThemeBtn)
 
if(!window.localStorage.getItem('Dark')){
    window.localStorage.setItem('Light','light');
    document.body.classList.toggle('light');
    } else{
        onThemeBtn()
     }
 
 if(!document.body.classList.contains('dark')) {
    window.localStorage.setItem('Light','light');
    document.body.classList.toggle('light');
 }else {
    onThemeBtn()
 }
 if(window.localStorage.getItem('')){
    window.localStorage.setItem('Light', 'light');
    document.body.classList.toggle('Light')
}


 
function onThemeBtn(evt) {
    console.log('aaaaaaa')
    if(!document.body.classList.contains('dark')) {
        document.body.classList.toggle('dark');
        window.localStorage.setItem('Dark', 'dark');
        document.body.classList.remove('light');
    } else{
        document.body.classList.remove('dark');
        document.body.classList.toggle('light');
        window.localStorage.setItem('Light', 'light'); 
    }
    if(! window.localStorage.getItem('Dark')) {
        window.localStorage.removeItem('Light');
        window.localStorage.setItem('Dark', 'dark');
    } else{
        window.localStorage.removeItem('Dark');
        window.localStorage.setItem('Light', 'light');
    }
     if(window.localStorage.getItem('')){
         window.localStorage.setItem('Dark', 'dark');
     }
     if(window.localStorage.getItem('Light')){
         window.localStorage.removeItem('Light');
         window.localStorage.setItem('Dark', 'dark');
         document.body.classList.toggle('dark');
     }

    }