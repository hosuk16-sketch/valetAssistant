// =====================
// 번호판 OCR 기능
// =====================


async function recognizePlate(imageFile){

    result.innerText =
    "🔍 번호판 인식 중...";


    const imageURL =
    URL.createObjectURL(imageFile);



    const worker =
    await Tesseract.createWorker(
        "kor+eng"
    );



    const output =
    await worker.recognize(imageURL);



    await worker.terminate();



    let text =
    output.data.text;



    console.log(text);



    // OCR 보정

    text =
    text.replace(/\s/g,"");


    text =
    text.replace(/카/g,"가");
    text =
    text.replace(/차/g,"가");
    text =
    text.replace(/거/g,"가");



    const match =
    text.match(
        /\d{2,3}[가-힣]\d{4}/
    );



    if(match){


        let number =
        match[0];


        let formatted =
        number.substring(
            0,
            number.length-4
        )
        +" "
        +
        number.substring(
            number.length-4
        );


        carInput.value =
        formatted;



        result.innerText =
        "✅ 번호판 인식 완료\n\n"
        + formatted;


    }

    else {


        result.innerText =
        "❌ 번호판을 찾지 못했습니다";


    }


}
