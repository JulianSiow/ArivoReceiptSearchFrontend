const APIUrl = "http://localhost:3000";

$('form').on('submit', (e) => {
    e.preventDefault();

    $('.payment-data').empty();
    $('.receipt-container').empty();
    $('.payment-data').append('<div class="spinner-border text-primary" role="status"> <span class="sr-only">Loading...</span> </div>')

    const plateNum = $('#licensePlateNum').val();
    const date = $('#date').val();
    const cardNum = $('#cardNum').val();

    const queriedDay = new Date(date);
    const day = new Date(queriedDay).getTime()/1000;
    const followingDay = new Date(queriedDay.getTime() + 86400000)/1000;

    $.ajax({
        url: `${APIUrl}/api/v1/payments/${plateNum}/${day}/${followingDay}/${cardNum}`,
        type: 'GET',
        success: (res) => {
            $('.payment-data').empty();
            $('.receipt-container').empty();
            if (res.data.length < 1) {
                $('.payment-container').append('<h3 class="err">No matching reciept was found... :(</h3>')
            } else {
                res.data.forEach(payment => {
                    console.log(payment)
                    $('.payment-data').append(`<p>Payment Amount: ${payment.payment_payload.amount}`)
                    $('.payment-data').append(`<p>Payment Type: ${payment.payment_payload.payment_type}`)
                    $('.receipt-container').append(`<pre>${payment.receipt}</pre>`)
                });
            }
        }
    });
})