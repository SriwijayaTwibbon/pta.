/* =====================================
   TWIBBON PENERIMAAN TAMU AMBALAN
   SMK SRIWIJAYA 2026

   SCRIPT.JS PART 1
===================================== */


/* ===============================
   ELEMENT
================================ */


const splash1 = document.getElementById("splash1");
const splash2 = document.getElementById("splash2");

const home = document.getElementById("home");
const loadingPage = document.getElementById("loadingPage");
const editorPage = document.getElementById("editorPage");
const finishPage = document.getElementById("finishPage");


const kategori = document.getElementById("kategori");

const upload = document.getElementById("upload");
const btnUpload = document.getElementById("btnUpload");

const namaFile = document.getElementById("namaFile");


const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const toastClose = document.getElementById("toastClose");


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");


const saveBtn = document.getElementById("saveBtn");


const hasilImage = document.getElementById("hasilImage");


const editAgainBtn = document.getElementById("editAgain");
const downloadBtn = document.getElementById("downloadBtn");
const homeBtn = document.getElementById("homeBtn");


const downloadNotif =
document.getElementById("downloadNotif");



/* ===============================
   DATA EDITOR
================================ */


let kategoriAktif = "";


let uploadedImage = new Image();

let templateImage = new Image();



let imageX = 0;
let imageY = 0;


let imageScale = 1;



let dragging = false;


let dragStartX = 0;
let dragStartY = 0;



let hasilDownload = "";



/* ===============================
   UKURAN CANVAS
================================ */


canvas.width = 983;
canvas.height = 1229;




/* ===============================
   SPLASH SCREEN
================================ */


window.addEventListener("load",()=>{


    splash1.classList.add("active");


    setTimeout(()=>{


        splash1.classList.remove("active");


        splash2.classList.add("active");


    },3000);



    setTimeout(()=>{


        splash2.classList.remove("active");


        home.classList.add("active");


    },6000);


});





/* ===============================
   GANTI HALAMAN
================================ */


function pindahHalaman(target){


    document
    .querySelectorAll(".page")
    .forEach(page=>{


        page.classList.remove("active");


    });



    target.classList.add("active");


}




/* ===============================
   TOAST
================================ */


function tampilPesan(text){


    toastText.innerHTML=text;


    toast.classList.add("show");


}



toastClose.addEventListener("click",()=>{


    toast.classList.remove("show");


});





/* ===============================
   PILIH KATEGORI
================================ */


kategori.addEventListener("change",()=>{


    kategoriAktif =
    kategori.value;


});






/* ===============================
   BUTTON UPLOAD
================================ */


btnUpload.addEventListener("click",()=>{


    if(kategoriAktif===""){


        tampilPesan(
        "Pilih dulu kamu peserta atau panitia"
        );


        return;


    }



    upload.click();



});






/* ===============================
   INPUT GAMBAR
================================ */


upload.addEventListener("change",(event)=>{


    let file =
    event.target.files[0];



    if(!file){

        return;

    }



    namaFile.innerHTML =
    file.name;




    pindahHalaman(loadingPage);




    let reader =
    new FileReader();



    reader.onload = function(e){


        uploadedImage.src =
        e.target.result;


    };



    reader.readAsDataURL(file);



});





/* ===============================
   FOTO SELESAI DIBACA
================================ */


uploadedImage.onload = ()=>{


    setTimeout(()=>{


        bukaEditor();


    },800);



};
/* =====================================
   SCRIPT.JS PART 2
   EDITOR CANVAS
===================================== */


/* ===============================
   BUKA EDITOR
================================ */


function bukaEditor(){


    if(kategoriAktif==="peserta"){


        templateImage.src =
        "assets/peserta.png";


    }


    else if(kategoriAktif==="panitia"){


        templateImage.src =
        "assets/panitia.png";


    }



}




/* ===============================
   TEMPLATE SELESAI LOAD
================================ */


templateImage.onload = ()=>{


    aturPosisiAwal();


    gambarCanvas();


    pindahHalaman(editorPage);



};





/* ===============================
   POSISI AWAL FOTO
================================ */


function aturPosisiAwal(){



    imageScale = 1;



    let scaleWidth =
    canvas.width / uploadedImage.width;



    let scaleHeight =
    canvas.height / uploadedImage.height;



    let scaleTerbesar =
    Math.max(scaleWidth,scaleHeight);



    imageScale =
    scaleTerbesar;



    imageX =
    (
        canvas.width -
        uploadedImage.width * imageScale
    ) / 2;



    imageY =
    (
        canvas.height -
        uploadedImage.height * imageScale
    ) / 2;



}





/* ===============================
   GAMBAR CANVAS
================================ */


function gambarCanvas(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    /*
      Foto berada di belakang
    */


    ctx.drawImage(

        uploadedImage,

        imageX,

        imageY,

        uploadedImage.width *
        imageScale,

        uploadedImage.height *
        imageScale

    );




    /*
       Twibbon selalu di depan
    */


    ctx.drawImage(

        templateImage,

        0,

        0,

        canvas.width,

        canvas.height

    );



}






/* ===============================
   ZOOM IN
================================ */


zoomInBtn.addEventListener("click",()=>{


    imageScale += 0.05;


    gambarCanvas();


});






/* ===============================
   ZOOM OUT
================================ */


zoomOutBtn.addEventListener("click",()=>{


    if(imageScale>0.1){


        imageScale -=0.05;


    }



    gambarCanvas();



});






/* ===============================
   DRAG MOUSE WINDOWS
================================ */


canvas.addEventListener(
"mousedown",
(e)=>{


    dragging=true;


    dragStartX =
    e.clientX -
    imageX;


    dragStartY =
    e.clientY -
    imageY;



});





canvas.addEventListener(
"mousemove",
(e)=>{


    if(!dragging){

        return;

    }



    imageX =
    e.clientX -
    dragStartX;



    imageY =
    e.clientY -
    dragStartY;



    gambarCanvas();



});





window.addEventListener(
"mouseup",
()=>{


    dragging=false;


});







/* ===============================
   TOUCH HP
================================ */


canvas.addEventListener(
"touchstart",
(e)=>{


    let touch =
    e.touches[0];



    dragging=true;



    dragStartX =
    touch.clientX -
    imageX;



    dragStartY =
    touch.clientY -
    imageY;



});






canvas.addEventListener(
"touchmove",
(e)=>{


    if(!dragging){

        return;

    }



    e.preventDefault();



    let touch =
    e.touches[0];



    imageX =
    touch.clientX -
    dragStartX;



    imageY =
    touch.clientY -
    dragStartY;



    gambarCanvas();



},
{
    passive:false
});






canvas.addEventListener(
"touchend",
()=>{


    dragging=false;


});
/* =====================================
   SCRIPT.JS PART 3 FINAL
   SAVE - DOWNLOAD - FINISH
===================================== */



/* ===============================
   SIMPAN HASIL EDIT
================================ */


saveBtn.addEventListener("click",()=>{


    /*
       Render terakhir sebelum simpan
    */


    gambarCanvas();



    hasilDownload =
    canvas.toDataURL(
        "image/png",
        1.0
    );



    hasilImage.src =
    hasilDownload;



    pindahHalaman(finishPage);



});






/* ===============================
   EDIT LAGI
================================ */


editAgainBtn.addEventListener("click",()=>{


    pindahHalaman(editorPage);



});






/* ===============================
   DOWNLOAD IMAGE
================================ */


downloadBtn.addEventListener("click",()=>{


    let link =
    document.createElement("a");



    link.download =
    "Twibbon_Penerimaan_Tamu_Ambalan_SMK_Sriwijaya.png";



    link.href =
    hasilDownload;



    link.click();




    tampilDownload();



    /*
       Tombol beranda aktif
    */


    homeBtn.style.display =
    "block";



});






/* ===============================
   NOTIF DOWNLOAD
================================ */


function tampilDownload(){


    downloadNotif.classList.add("show");



    setTimeout(()=>{


        downloadNotif.classList.remove("show");


    },4000);



}






/* ===============================
   KEMBALI BERANDA
================================ */


homeBtn.addEventListener("click",()=>{


    /*
       reset upload
    */


    upload.value="";


    namaFile.innerHTML =
    "Belum ada gambar dipilih";



    kategori.value="";


    kategoriAktif="";



    imageX=0;

    imageY=0;

    imageScale=1;



    pindahHalaman(home);



});






/* ===============================
   DEFAULT HIDDEN HOME BUTTON
================================ */


homeBtn.style.display="none";






/* ===============================
   CEGAH MENU REFRESH
================================ */


window.addEventListener(
"beforeunload",
()=>{


    localStorage.removeItem(
    "twibbonTemp"
    );


});
