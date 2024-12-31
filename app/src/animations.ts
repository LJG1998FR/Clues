import gsap from "gsap";

function revealCardAnimation(id:string) {
    const t:GSAPTimeline = new gsap.core.Timeline({defaults: {immediateRender:false}});
    var cardToReveal:HTMLDivElement = <HTMLDivElement>document.querySelector('#'+id+' .flip-card-inner');

    t.fromTo(cardToReveal, {rotateY:0}, {rotateY:180, duration:0.1});

    console.log(cardToReveal);
    return t;
}

export { revealCardAnimation }