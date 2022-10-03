let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-1/8a1f33aa9b785cb6db19b2ad6e67042d5d029acb/da21b1");
    xhr.responseType = "arraybuffer";
 
    xhr.onload = (e)=>{
        let blob = new Blob([xhr.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video")
        image.src = url;
    }
    xhr.send();

//SCRIP1
let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-1/8a1f33aa9b785cb6db19b2ad6e67042d5d029acb/da21b1");
    xhr1.responseType = "arraybuffer";
 
    xhr1.onload = (e)=>{
        let blob = new Blob([xhr1.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-1")
        image.src = url;
    }
    xhr1.send();

//SCRIP2
let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-2/ff0341852546c82798d23be5484780d93ffbdd7b/1a80d4");
    xhr2.responseType = "arraybuffer";
 
    xhr2.onload = (e)=>{
        let blob = new Blob([xhr2.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-2")
        image.src = url;
    }
    xhr2.send();

//SCRIP3
let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-3/0693eba2ea627abcf0b000bc2f83c31b28dc90d6/a56ad4");
    xhr3.responseType = "arraybuffer";
 
    xhr3.onload = (e)=>{
        let blob = new Blob([xhr3.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-3")
        image.src = url;
    }
    xhr3.send();

//SCRIP4
let xhr4 = new XMLHttpRequest();
    xhr4.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-4/88e3436f39b195ba18a740828763a7392dc4ce8f/a772ca");
    xhr4.responseType = "arraybuffer";
 
    xhr4.onload = (e)=>{
        let blob = new Blob([xhr4.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-4")
        image.src = url;
    }
    xhr4.send();

//SCRIP5
let xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-5/e9a7847703274f8324ee4516957e6c49460de987/f7dae5");
    xhr5.responseType = "arraybuffer";
 
    xhr5.onload = (e)=>{
        let blob = new Blob([xhr5.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-5")
        image.src = url;
    }
    xhr5.send();

//SCRIP6
let xhr6 = new XMLHttpRequest();
    xhr6.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-6/90b36360855c219edb97f5009ee342e2f1bb3801/8b3913");
    xhr6.responseType = "arraybuffer";
 
    xhr6.onload = (e)=>{
        let blob = new Blob([xhr6.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-6")
        image.src = url;
    }
    xhr6.send();

//SCRIP7
let xhr7 = new XMLHttpRequest();
    xhr7.open("GET", "https://player.odycdn.com/api/v4/streams/free/iseji-1-7/134a0989aa15277083ac56de5427b874346a92b8/edbbf9");
    xhr7.responseType = "arraybuffer";
 
    xhr7.onload = (e)=>{
        let blob = new Blob([xhr7.response]);
        let url = URL.createObjectURL(blob);
        
        let image = document.getElementById("video-7")
        image.src = url;
    }
    xhr7.send();