const button = document.querySelector("#add"),
    toast = document.querySelector(".add-notify")
    closeIcon = document.querySelector(".close"),
    progress = document.querySelector(".progress");
  
    let timer1, timer2;
  
    button.addEventListener("click", () => {
      toast.classList.add("active");
      progress.classList.add("active");
  
      timer1 = setTimeout(() => {
          toast.classList.remove("active");
      }, 4000); //1s = 1000 milliseconds
  
        timer2 = setTimeout(() => {
        progress.classList.remove("active");
      }, 4300);
    });
        
    closeIcon.addEventListener("click", () => {
      toast.classList.remove("active");
          
      setTimeout(() => {
        progress.classList.remove("active");
      }, 300);
  
      clearTimeout(timer1);
      clearTimeout(timer2);
    });
  
const remove = document.querySelector("#remove"),
    toast2 = document.querySelector(".remove-notify")
    closeIcon2 = document.querySelector(".close2"),
    progress2 = document.querySelector(".progress2");
  
    let timer3, timer4;
  
    remove.addEventListener("click", () => {
      toast2.classList.add("active");
      progress2.classList.add("active");
  
      timer3 = setTimeout(() => {
          toast2.classList.remove("active");
      }, 4000); //1s = 1000 milliseconds
  
      timer4 = setTimeout(() => {
        progress2.classList.remove("active");
      }, 4300);
    });
        
    closeIcon2.addEventListener("click", () => {
      toast2.classList.remove("active");
          
      setTimeout(() => {
        progress2.classList.remove("active");
      }, 300);
  
      clearTimeout(timer3);
      clearTimeout(timer4);
});

/*=============== SHOW MODAL ===============*/
const showModal = (openButton, modalContent) =>{
  const openBtn = document.getElementById(openButton),
  modalContainer = document.getElementById(modalContent)
  
  if(openBtn && modalContainer){
      openBtn.addEventListener('click', ()=>{
          modalContainer.classList.add('show-modal')
      })
  }
}
showModal('open-modal','modal-container')

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal')

function closeModal(){
  const modalContainer = document.getElementById('modal-container')
  modalContainer.classList.remove('show-modal')
}
closeBtn.forEach(c => c.addEventListener('click', closeModal))

//READ MORE
const parentContainer = document.querySelector('#read-more-container');
parentContainer.addEventListener('click', event=>{
  const current = event.target;
  const isReadMoreBtn = current.className.includes('read-more-btn');
  if (!isReadMoreBtn) return;
  const currentText = event.target.parentNode.querySelector('.read-more-text');
  currentText.classList.toggle('read-more-text--show');
  current.textContent = current.textContent.includes('Ver Más') ? "Ver Menos" : "Ver Más";
})