const logo = document.querySelectorAll('#logo path');

for(let i = 0; i < logo.length; i++) {
    console.log(`letter ${i} is ${logo[i].getTotalLength()}`);
}

// document.addEventListener('DOMContentLoaded', () => {
//     function animateSgv(id, delay, delayIncrement) {
//         const logo = document.getElementById(id);
//         const logoPaths = document.querySelectorAll(`#${id} path`);
//         delay = delay;
//         for (let i = 0; i < logoPaths.length; i++) {
//             logoPaths[i].style.strokeDasharray = logoPaths[i].getTotalLength();
//             logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
//             logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`;
//             delay += delayIncrement;
//             console.log(delay)
//         }
//         logo.style.animation = `fill 0.5s ease forwards ${delay}s`;
//     }
//     // Set the id of SVG, delay time in seconds to start animation and delay between each animation
//     animateSgv('logo', 0, 0.8)
// }, false);