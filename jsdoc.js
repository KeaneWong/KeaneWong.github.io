const [red,green,blue,opa] = [102,186,239,0]
const header = document.querySelector('.header')
window.addEventListener('scroll',()=>{
	const y = (window.scrollY)/150

	header.style.background = 'rgba(102,186,239,'+y+')'
})