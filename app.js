alert("app.js 실행됨");
let selectedFloor = "없음";
let selectedArea = "";

const floorButtons =
document.querySelectorAll(".floorButtons button");

const areaContainer =
document.querySelector(".areaButtons");

const copyButton =
document.querySelector(".copy");

const carInput =
document.getElementById("carNumber");

const result =
document.getElementById("result");

const cameraButton =
document.getElementById("cameraButton");

const cameraInput =
document.getElementById("cameraInput");

const previewImage =
document.getElementById("previewImage");


// 시작
updateAreas();


// 층 선택

floorButtons.forEach(button => {

    button.addEventListener("click", function(){

        selectedFloor = this.innerText;
        selectedArea = "";

        floorButtons.forEach(btn=>{
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        updateAreas();

    });

});



// 구역 버튼 생성

function updateAreas(){

    areaContainer.innerHTML="";

    let areas=[];


    if(selectedFloor==="없음"){

        areas=[
            "a",
            "b",
            "c",
            "d",
            "e",
            "rac",
            "외곽1",
            "외곽2"
        ];

    }


    else if(
        selectedFloor==="지하1층" ||
        selectedFloor==="지하2층"
    ){

        areas=[
            "a",
            "b",
            "c",
            "d",
            "e"
        ];

    }


    areas.forEach(area=>{

        let button =
        document.createElement("button");

        button.innerText=area;


        button.onclick=function(){

            selectedArea=area;

            document
            .querySelectorAll(".areaButtons button")
            .forEach(btn=>{
                btn.classList.remove("selected");
            });


            this.classList.add("selected");

        };


        areaContainer.appendChild(button);

    });

}




// 차량번호 띄어쓰기

function formatCarNumber(value){

    // 공백 제거
    value = value.replace(/\s/g,"");


    // 숫자 2~3자리 + 한글 + 숫자 4자리
    let match =
    value.match(/^(\d{2,3}[가-힣])(\d{4})$/);


    if(match){

        return match[1] + " " + match[2];

    }


    return value;

}


carInput.addEventListener("input",function(){

    this.value =
    formatCarNumber(this.value);

});




// 복사

copyButton.addEventListener("click",async()=>{


    let text =
    formatCarNumber(carInput.value);



    if(selectedFloor==="2층"){

        text += " 2층";

    }

    else if(
        selectedFloor==="지하1층" ||
        selectedFloor==="지하2층"
    ){

        text += " "+selectedFloor;

        if(selectedArea){

            text += " "+selectedArea;

        }

    }

    else{

        if(selectedArea){

            text += " "+selectedArea;

        }

    }


    await navigator.clipboard.writeText(text);


    result.innerText =
    "✅ 복사 완료\n\n"+text;


});




// 카메라

cameraButton.addEventListener("click",()=>{

    cameraInput.click();

});


cameraInput.addEventListener("change",(event)=>{


    const file =
    event.target.files[0];


    if(!file)return;


    previewImage.src =
    URL.createObjectURL(file);


    previewImage.style.display="block";


    result.innerText=
    "📷 사진 등록 완료";


});
