$('form').on('submit', (e) => {
    e.preventDefault();

    const plateNum = $('#licensePlateNum').val();
    const date = $('#date').val();
    const cardNum = $('#cardNum').val();

    const queriedDay = new Date(date);
    const day = new Date(queriedDay).getTime()/1000;
    const followingDay = new Date(queriedDay.getTime() + 86400000)/1000;
    

    console.log(queriedDay/1000);
    console.log(followingDay)

    $.ajax({
        url: `http://localhost:3000/api/v1/payments/${plateNum}/${day}/${followingDay}/${cardNum}`,
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

const dbDate = new Date(1531839805135.056).setHours(0,0,0,0);

// const dbTimestamp = dbDate.getTime();

console.log('db date: ' + dbDate);
// console.log('db timestamp: ' + dbTimestamp);