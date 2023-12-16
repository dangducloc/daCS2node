/*!
=========================================================
* FoodHut Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
    $("input.unchange").attr('disabled', 'disabled');

    $("form").submit(function () {
        $(':input', this).removeAttr('disabled');
    })
    let height = $('nav').height()
    $('#comment').css({ "position": "sticky", "top": "200px", "height": "400px" })
    $('#summary').css({ "position": "sticky", "top": "200px", "height": "600px" })
})
$(document).ready(function () {
    var sum = 0;
    var a = document.querySelectorAll('.Total')
    for (let i = 0; i < a.length; i++) {
        sum += parseInt($(a[i]).text());
    } $('.Total_cost').text(sum)
    // alert(sum)
    $('.button').click(function () {
        var a = $(this).parent().parent().parent().find('.price').text()
        var b = $(this).parent().parent().parent().find('.form1').val();
        var c = parseInt(a) * parseInt(b)
        $(this).parent().parent().parent().find('.Total').text(c);
        var sum = 0;
        var a = document.querySelectorAll('.Total')
        for (let i = 0; i < a.length; i++) {
            sum += parseInt($(a[i]).text());
        } $('.Total_cost').text(sum)
    })
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('.remove').click(() => {
        $(".form").attr("action", "/Remove");
    })
    $('.buynow').click(() => {
        $(".form").attr("action", "/BuyNow");
    })
    $('.save').click(() => {
        $(".form").attr("action", "/Save");
    })
})
$(document).ready(function () {
    if ($('#user').text().trim() === "") {
        $('li.user').hide()
        $('a#AddCart').hide()
        $('button#BuyNow').hide()
        $('a#FeedBack').hide()
        $('#yourCart').hide()
    }
    else {
        $('.log').find('a').text("Log out")
        $('.log').find('a').attr('href', 'Logout')
    }
    $('.type').click(function () {
        if ($(this).find('a').text().trim() === "Cake") {
            $('.1,.3,.4').hide()
            $('.2').show()
        }
        if ($(this).find('a').text().trim() === "Drink") {
            $('.1,.2,.4').hide()
            $('.3').show()
        }
        if ($(this).find('a').text().trim() === "Main meal") {
            $('.2,.3,.4').hide()
            $('.1').show()
        }
        if ($(this).find('a').text().trim() === "Others") {
            $('.2,.3,.1').hide()
            $('.4').show()
        }
        if ($(this).find('a').text().trim() === "Foods") {
            $('.1,.2,.3,.4').show()
        }
    })

});
$(document).ready(function () {
    $(".navbar .nav-link").on('click', function (event) {

        if (this.hash !==  "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });
});

new WOW().init();
