$('form').on('submit', (e) => {
    e.preventDefault();

    const plateNum = $('#licensePlateNum').val();
    const date = $('#date').val();
    const cardNum = $('#cardNum').val();

    $.ajax({
        url: `http://localhost:3000/api/v1/payments/${plateNum}/${date}/${cardNum}`,
        type: 'GET',
        success: (res) => {
            if (res.data.length < 1) {
                $('.payment-container').append('<h3 class="err">No matching reciept was found... :(</h3>')
            } else {
                res.data.forEach(payment => {
                    $('.payment-container').append(`<pre class="receipt">${payment.receipt}</pre>`)
                });
            }
        }
    });
})