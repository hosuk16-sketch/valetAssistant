async function recognizePlate(imageFile){

    result.innerText =
    "🔍 번호판 분석 중...";


    const imageURL =
    URL.createObjectURL(imageFile);


    const worker =
    await Tesseract.createWorker("kor+eng");


    await worker.setParameters({

        tessedit_char_whitelist:
        "0123456789가나다라마바사아자차카타파하"

    });



    const output =
    await worker.recognize(imageURL);



    await worker.terminate();



    let text =
    output.data.text;



    console.log("OCR 결과:", text);



    // 불필요 문자 제거

    text =
    text.replace(/[^0-9가-힣]/g,"");



    // OCR 오류 보정

    text =
    text.replace(/카/g,"가");
    text =
    text.replace(/차/g,"가");
    text =
    text.replace(/거/g,"가");



    const match =
    text.match(
        /(\d{2,3}[가-힣]\d{4})/
    );



    if(match){


        let number =
        match[1];


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
        "✅ 인식 완료\n\n"
        + formatted;



    }
    else {


        result.innerText =
        "❌ 번호판 인식 실패\n다시 촬영해주세요";


    }


}
