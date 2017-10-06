$(function() {
  $('form').on('submit', function(e){
    e.preventDefault();

    const guestNum = parseInt($('[name="number"]').val());

    const tokenString = "key4Lu3ahLQPq924o"

    var i = 1,
        html = "",
        output = "",
        formData = {"fields": {"name": $('[name="name"]').val(), "email": $('[name="email"]').val(), "guests": parseInt($('[name="number"]').val())}};

    if(guestNum == 0){
      $.ajax({
        method: 'POST',
        url: 'https://api.airtable.com/v0/appHjzCkSS35MvxgN/RSVPs',
        data: JSON.stringify(formData),
        contentType: "application/json",
        processData: false,
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('Authorization','Bearer ' + tokenString );
        },
        success: function(){
          swal(
            'Thank you for your response!',
          );
          $('#rsvp-form')[0].reset();
          $('select').niceSelect('update');
        }
      });
    }
    else{

    while(i < guestNum + 1){
      html += '<input id="guest-' + i +'" class="swal2-input" placeholder="Guest ' + i + ' name">';
      i++;
    }

    swal({
      title: 'Guest Names',
      html: '<p style="margin:0;">Please type the name of each guest as they would like it to appear on their place card.</p>' + html,
      focusConfirm: false,
      buttonsStyling: false,
      showCancelButton: true,
      cancelButtonText: 'Go Back',
      cancelButtonClass: 'btn btn-lg',
      confirmButtonClass: 'btn btn-lg',
      confirmButtonText: 'Submit my RSVP!',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $('#guest-1').val(),
            $('#guest-2').val(),
            $('#guest-3').val(),
            $('#guest-4').val(),
            $('#guest-5').val(),
            $('#guest-6').val(),
          ])
        })
      }
    }).then(function (result) {

      var i;

      for (i = 0; i < result.length; i++) {
        if(result[i] == undefined){
          output += '"guest-name-' + (i+1) + '": "",';
          var newGuest = "guest-name-" + (i+1);
          formData.fields[newGuest] = "";
        }
        else {
          output += '"guest-name-' + (i+1) + '": "' + result[i] + '",';
          var newGuest = "guest-name-" + (i+1);
          formData.fields[newGuest] = result[i];
        }
      };
        $.ajax({
          method: 'POST',
          url: 'https://api.airtable.com/v0/appHjzCkSS35MvxgN/RSVPs',
          data: JSON.stringify(formData),
          contentType: "application/json",
          processData: false,
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Authorization','Bearer ' + tokenString );
          },
          success: function(){
            swal(
              'RSVP Received!',
              'We\'re looking forward to seeing you!',
              'success'
            );
            $('#rsvp-form')[0].reset();
            $('select').niceSelect('update');
          }
        });
    }).catch(swal.noop);
  }
  });
});
