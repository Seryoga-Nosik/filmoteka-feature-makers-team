let themeBtn = document.querySelector('.change');
const iconLight = document.querySelector('[data-theme="light"')
    const iconDark =document.querySelector('[data-theme="dark"]')
themeBtn.addEventListener('click', onThemeBtn);



 
if(!window.localStorage.getItem('Dark')){
    window.localStorage.setItem('Light','light');
    document.body.classList.toggle('light');
    } else{
        window.localStorage.setItem('Dark', 'dark');
        document.body.classList.toggle('dark');
     }
     
     if(!document.body.classList.contains('dark')) {
    window.localStorage.setItem('Light','light');
    document.body.classList.toggle('light');
 }else {
    window.localStorage.setItem('Dark', 'dark');
        document.body.classList.toggle('dark');
 }
 if(window.localStorage.getItem('')){
    window.localStorage.setItem('Light', 'light');
    document.body.classList.toggle('light')
}



 
function onThemeBtn(evt) {
    
    if(!document.body.classList.contains('dark')) {
        document.body.classList.remove('light');
        document.body.classList.toggle('dark');
        window.localStorage.setItem('Dark', 'dark');
        
     

       
    }else {
        document.body.classList.remove('dark');
        document.body.classList.toggle('light');
        window.localStorage.setItem('Light', 'light'); 
     
    }
    if(!window.localStorage.getItem('Dark')) {
        window.localStorage.removeItem('Light');
        window.localStorage.setItem('Dark', 'dark');
    //    document.body.classList.toggle('dark')
      
    }else {
        window.localStorage.removeItem('Dark');
        // document.body.classList.toggle('light');
        window.localStorage.setItem('Light', 'light');
       
    }
    //  if(window.localStorage.getItem('')){
    //      window.localStorage.setItem('Dark', 'dark');
    //  }
  
 }

