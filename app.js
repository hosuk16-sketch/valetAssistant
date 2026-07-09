// 현재 선택 상태

let selectedFloor = "없음";
let selectedArea = "";



// 버튼 가져오기

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




// 처음 실행
updateAreas();




// 층 버튼 이벤트

floorButtons.forEach(button => {


    button.addEventListener("click", function(){


        selectedFloor =
        this.innerText;


        selectedArea = "";


        floorButtons.forEach(btn =>
            btn.classList.remove("selected")
        );


        this.classList.add("selected");


        updateAreas();


    });


});




// 구역 버튼 업데이트

function updateAreas(){


    areaContainer.innerHTML = "";



    let areas = [];



    if(selectedFloor === "없음") {


       areas =
[
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
        selectedFloor === "지하1층" ||
        selectedFloor === "지하2층"
    ){


        areas =
       [
"a",
"b",
"c",
"d",
"e"
];


    }



    else if(selectedFloor === "2층"){


        areas = [];

    }



    areas.forEach(area => {


        const button =
        document.createElement("button");


        button.innerText = area;



        button.addEventListener("click", function(){


            selectedArea = area;


            document
            .querySelectorAll(".areaButtons button")
            .forEach(btn =>
                btn.classList.remove("selected")
            );


            this.classList.add("selected");


        });



        areaContainer.appendChild(button);


    });



}




// 차량번호 띄어쓰기 자동 변환

function formatCarNumber(value){


    value =
    value.replace(/\s/g,"");


    const match =
    value.match(/^(\d{2,3}[가-힣])(\d{4})$/);



    if(match){

        return match[1]
        + " "
        + match[2];

    }


    return value;


}




// 입력할 때 자동 변환

carInput.addEventListener(
"input",
function(){


    this.value =
    formatCarNumber(this.value);


});





// 복사 버튼

copyButton.addEventListener(
"click",
async function(){


    let car =
    formatCarNumber(
        carInput.value
    );


    let text = car;



    if(selectedFloor === "2층"){


        text +=
        " 2층";


    }


    else if(
        selectedFloor === "지하1층" ||
        selectedFloor === "지하2층"
    ){


        text +=
        " "
        + selectedFloor;


        if(selectedArea){

            text +=
            " "
            + selectedArea;

        }


    }


    else {


        if(selectedArea){

            text +=
            " "
            + selectedArea;

        }


    }





    await navigator.clipboard.writeText(text);



    result.innerText =
    "✅ 복사 완료\n\n"
    + text;



});

// =================
// 카메라 기능
// =================

const cameraButton = document.getElementById("cameraButton");
const cameraInput = document.getElementById("cameraInput");
const previewImage = document.getElementById("previewImage");


cameraButton.addEventListener("click", () => {

    cameraInput.click();

});


cameraInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;


    const imageURL = URL.createObjectURL(file);


    previewImage.src = imageURL;

    previewImage.style.display = "block";


    result.innerText =
    "📷 사진 등록 완료";


});

}
