function revealCardAnimation(id:string) {
    var cardToReveal:HTMLDivElement = <HTMLDivElement>document.querySelector('#'+id+' .flip-card-inner');
    cardToReveal.style.transform = 'rotateY(180deg)';

    console.log(cardToReveal)
}

export { revealCardAnimation }