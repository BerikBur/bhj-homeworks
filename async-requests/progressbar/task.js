document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const progressBar = document.getElementById('progress');

    // Проверка на наличие файла
    if(fileInput.files.length === 0) {
        alert('Необходимо выбрать файл');
        return;
    }

    const file = fileInput.files[0];
    const fileSize = file.size;

    let uploadedBytes = 0;

    // Применение объекта ReadableStream для отслеживания прогресса отправки файла
    const stream = new ReadableStream({
        start(controller) {
            const reader = file.stream().getReader();

            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        return;
                    }

                    uploadedBytes += value.length;
                    const percentComplete = (uploadedBytes / fileSize) * 100;
                    progressBar.value = percentComplete;

                    // Поместить фрагмент файла в очерель потока
                    controller.enqueue(value);
                    read();
                });
            }

            read();
        }
    });

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        body: stream,
        duplex: 'half'
    });

    if(response.ok) {
        alert('Файл загружен успешно');
        progressBar.value = 100;
    } else {
        alert('Загрузка не выполнена');
    }
});
