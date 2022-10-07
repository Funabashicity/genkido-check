'ues strict';
{
 const $text = document.getElementById('text');
 const $textArray = $text.textContent.split('');
 $text.textContent = '';        
 for(let i = 0 ; i < $textArray.length; i++ ){
   let counter = (i + 1) * 0.5;
   let $span = '<span style="transition:' + counter + 's;">'+ $textArray[i] +'</span>';
   $text.insertAdjacentHTML('beforeend', $span);              
  }
  //ロードしたらopacityを１にするクラスの付与をする
  window.addEventListener('load',() => {
   document.getElementsByClassName('opening-wrap')[0].classList.add('active');
   new Promise((resolve)=>{
     setTimeout(() => {
       $text.classList.add('on');
       resolve();
     },100);
   }).then(()=>{
     setTimeout(()=>{
           document.getElementsByClassName('opening-wrap')[0].classList.add('end');     
          }, 2000);
   }).then(()=>{
    setTimeout(()=>{
      document.getElementsByClassName('opening-wrap')[0].remove();      
    }, 2500);
   })
  });
}
