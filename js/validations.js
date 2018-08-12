export function isValidZip(zip){
    return /^\d{5}(-\d{4})?$/.test(zip)
}

export function showInputError(el,msg){
el.classList.add('is-invalid');
if(!el.parentElement.getElementsByClassName('text-danger')[0]){
    el.parentElement.insertAdjacentHTML('beforeend',`<small class="text-danger">${msg}</small>`);
}
}

export function removeInputError(el){
el.classList.remove('is-invalid');
var errText = document.getElementsByClassName('text-danger')[0];
if(errText){
    el.parentElement.removeChild(errText);
}
}