
// ==============================
// VARIABEL
// ==============================


const intro = document.getElementById("intro");

const homePage = document.getElementById("home-page");

const editPage = document.getElementById("edit-page");

const finishPage = document.getElementById("finish-page");


const uploadImage = document.getElementById("uploadImage");

const typeSelect = document.getElementById("typeSelect");


const canvas = document.getElementById("twibbonCanvas");

const ctx = canvas.getContext("2d");


const zoomInBtn = document.getElementById("zoomIn");

const zoomOutBtn = document.getElementById("zoomOut");


const saveButton = document.getElementById("saveButton");


const resultImage = document.getElementById("resultImage");


const downloadButton = document.getElementById("downloadButton");

const editAgain = document.getElementById("editAgain");

const backHome = document.getElementById("backHome");




// ==============================
// DATA EDIT
// ==============================


let selectedType = "";

let userImage = new Image();


let imageX = 0;
let imageY = 0;


let imageScale = 1;



let dragging = false;

let startX = 0;
let startY = 0;



let templateImage = new Image();





// ==============================
// INTRO ANIMATION
// ==============================


window.onload = () => {


    setTimeout(()=>{


        document.querySelector(".logo-animation-1")
        .style.display="none";


        document.querySelector(".logo-animation-2")
        .style.display="flex";


    },3000);



    setTimeout(()=>{


        intro.style.display="none";


        homePage.style.display="block";


    },6000);



};









// ==============================
// PILIH TEMPLATE
// ==============================


typeSelect.addEventListener("change",()=>{


    selectedType = typeSelect.value;


});










// ==============================
// UPLOAD FOTO
// ==============================


uploadImage.addEventListener("change",(event)=>{


    let file = event.target.files[0];


    if(!file) return;



    let reader = new FileReader();



    reader.onload = function(e){


        userImage.onload=function(){


            imageScale = 1;


            imageX = canvas.width/2;

            imageY = canvas.height/2;



            loadTemplate();


            showPage(editPage);



        };



        userImage.src=e.target.result;



    };


    reader.readAsDataURL(file);



});









// ==============================
// LOAD TEMPLATE
// ==============================


function loadTemplate(){



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    drawUserImage();




    if(selectedType==="peserta"){


        templateImage.src =
        "assets/peserta.png";


    }
    else if(selectedType==="panitia"){


        templateImage.src =
        "assets/panitia.png";


    }



    templateImage.onload=()=>{


        ctx.drawImage(
            templateImage,
            0,
            0,
            canvas.width,
            canvas.height
        );


    };



}









// ==============================
// GAMBAR FOTO
// ==============================


function drawUserImage(){



    if(!userImage.src)
    return;



    let width =
    userImage.width * imageScale;


    let height =
    userImage.height * imageScale;



    ctx.drawImage(

        userImage,

        imageX-width/2,

        imageY-height/2,

        width,

        height

    );



}









// ==============================
// RENDER ULANG
// ==============================


function redraw(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    drawUserImage();



    if(templateImage.src){


        ctx.drawImage(
            templateImage,
            0,
            0,
            canvas.width,
            canvas.height
        );

    }



}










// ==============================
// ZOOM
// ==============================


zoomInBtn.onclick=()=>{


    imageScale +=0.1;


    redraw();


};



zoomOutBtn.onclick=()=>{


    imageScale -=0.1;


    if(imageScale<0.1)
    imageScale=0.1;


    redraw();


};









// ==============================
// DRAG MOUSE WINDOWS
// ==============================



canvas.addEventListener(
"mousedown",
(e)=>{


    dragging=true;


    startX=e.offsetX-imageX;

    startY=e.offsetY-imageY;



});




canvas.addEventListener(
"mousemove",
(e)=>{


    if(!dragging)
    return;



    imageX=e.offsetX-startX;

    imageY=e.offsetY-startY;


    redraw();



});



canvas.addEventListener(
"mouseup",
()=>{


    dragging=false;


});



canvas.addEventListener(
"mouseleave",
()=>{


    dragging=false;


});









// ==============================
// DRAG HP TOUCH
// ==============================


canvas.addEventListener(
"touchstart",
(e)=>{


    dragging=true;


    let touch=e.touches[0];


    let rect=canvas.getBoundingClientRect();



    startX=
    touch.clientX-rect.left-imageX;


    startY=
    touch.clientY-rect.top-imageY;



});





canvas.addEventListener(
"touchmove",
(e)=>{


    if(!dragging)
    return;



    let touch=e.touches[0];


    let rect=canvas.getBoundingClientRect();



    imageX=
    touch.clientX-rect.left-startX;



    imageY=
    touch.clientY-rect.top-startY;



    redraw();



});





canvas.addEventListener(
"touchend",
()=>{


    dragging=false;


});









// ==============================
// SIMPAN HASIL
// ==============================



saveButton.onclick=()=>{


    let result =
    canvas.toDataURL("image/png");



    resultImage.src=result;



    showPage(finishPage);



};









// ==============================
// DOWNLOAD
// ==============================


downloadButton.onclick=()=>{


    let link =
    document.createElement("a");



    link.download=
    "Twibbon-SMK-Sriwijaya-2026.png";



    link.href=
    resultImage.src;



    link.click();



    backHome.style.display="block";



};









// ==============================
// EDIT ULANG
// ==============================


editAgain.onclick=()=>{


    showPage(editPage);



};









// ==============================
// KEMBALI BERANDA
// ==============================


backHome.onclick=()=>{


    showPage(homePage);



};









// ==============================
// GANTI PAGE
// ==============================


function showPage(page){



    homePage.style.display="none";

    editPage.style.display="none";

    finishPage.style.display="none";



    page.style.display="block";



}