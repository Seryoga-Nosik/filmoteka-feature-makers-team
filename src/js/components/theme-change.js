let themeBtn = document.querySelector('.change');
const iconLight = document.querySelector('[data-theme="light"')
    const iconDark =document.querySelector('[data-theme="dark"]')
themeBtn.addEventListener('click', onThemeBtn);


if (!localStorage.theme) 
    localStorage.theme = 'light'
    document.body.className = localStorage.theme


  




function onThemeBtn () {
document.body.classList.toggle("dark");

localStorage.theme = document.body.className || "light";
if(localStorage.theme === "dark") {

}
    

   

    

}


 
// if(!window.localStorage.getItem('Dark')){
//     window.localStorage.setItem('Light', 'light');

//     } else{
//         window.localStorage.setItem('Dark','dark');
       
//      }
     
//      if(!document.body.classList.contains('dark')) {
//     window.localStorage.setItem('Light','light');
//     document.body.classList.toggle('light');
//  }else {
//     window.localStorage.setItem('Dark', 'dark');
//         document.body.classList.toggle('dark');
//  }




 
// function onThemeBtn(evt) {
    
//     if(!document.body.classList.contains('dark')) {
//         document.body.classList.remove('light');
//         document.body.classList.toggle('dark');
//         }else {
//         document.body.classList.remove('dark');
//         document.body.classList.toggle('light');
//         window.localStorage.setItem('Light', 'light'); 
     
//     }
//     if(!window.localStorage.getItem('Dark')) {
//         window.localStorage.removeItem('Light');
//         window.localStorage.setItem('Dark', 'dark');
//     //    document.body.classList.toggle('dark')
      
//     }else {
//         window.localStorage.removeItem('Dark');
//         // document.body.classList.toggle('light');
//         window.localStorage.setItem('Light', 'light');
       
//     }
//     //  if(window.localStorage.getItem('')){
//     //      window.localStorage.setItem('Dark', 'dark');
//     //  }
  
//  }

