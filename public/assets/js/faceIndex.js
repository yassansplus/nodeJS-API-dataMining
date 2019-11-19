


start();

function start() {



    $('.upload').click(function () {
        $("#imgInp").click()
    })



    $("#imgInp").on("change", async function () {
        readURL(this);
        const MODEL_URL = '/models'

        await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
        await faceapi.loadFaceLandmarkModel(MODEL_URL)
        await faceapi.loadFaceRecognitionModel(MODEL_URL)
        await faceapi.loadAgeGenderModel(MODEL_URL);
        const input = document.getElementById('blah');


        let detections = await faceapi.detectAllFaces(input).withAgeAndGender();
        const displaySize = { width: input.width, height: input.height }
        const canvas = document.getElementById('overlay')
        faceapi.matchDimensions(canvas, displaySize)
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections)

        // detections.forEach(detect => {
        //     const box = detect.detection.box
        //     // see DrawBoxOptions below
        //     const drawOptions = {
        //         label: detect.gender,
        //         lineWidth: 2
        //     }
        //     const drawBox = new faceapi.draw.DrawBox(box, drawOptions)
        //     drawBox.draw(canvas)
        // });
        refreshMyChart(detections);

    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
                $('#blah').attr('hidden', false);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


}

