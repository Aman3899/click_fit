$(document).ready(function() {

    console.log("Click Fit Frontend Initialized!");
    $('.fade-in-element').each(function(index) {
        $(this).delay(index * 150).queue(function(){
            $(this).addClass('visible').dequeue();
        });
    });
    const apiUrl = 'http://numbersapi.com/1/30/date?json';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log("API Data Received:", data);
            const apiHtml = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${data.text}</h5>
                        <p class="card-text">Year: ${data.year}</p>
                        <p class="card-text">Number: ${data.number}</p>
                    </div>
                </div>
            `;
            $('#api-content').html(apiHtml);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("API Fetch Error:", textStatus, errorThrown);
            $('#api-content').html('<p class="text-danger">Failed to load data from API.</p>');
        }
    });

    $('#upload-form').on('submit', function(event) {
        event.preventDefault();

        const imageFile = $('#imageUpload')[0].files[0];
        const feedbackElement = $('#upload-feedback');

        if (imageFile) {
            console.log("Image selected:", imageFile.name);
            feedbackElement.text(`Selected file: ${imageFile.name}. Upload functionality requires backend implementation.`).removeClass('text-danger').addClass('text-success');
            
            const formData = new FormData();
            formData.append('fitnessImage', imageFile);

            $.ajax({
                url: '/upload',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log("Upload successful:", response);
                    feedbackElement.text('Image uploaded successfully!').removeClass('text-danger').addClass('text-success');
                },
                error: function() {
                    console.error("Upload failed");
                    feedbackElement.text('Image upload failed. Please try again.').removeClass('text-success').addClass('text-danger');
                }
            });
        } else {
            console.log("No image selected.");
            feedbackElement.text('Please select an image file first.').removeClass('text-success').addClass('text-danger');
        }
    });

    $('.navbar-nav .nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 56
            }, 800, function(){
            });
        }
    });

});