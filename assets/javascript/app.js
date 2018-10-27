$(document).ready(function () {
    var animals = [];
    animals = ArrNoDupe(animals);
    var renderer = function () {
      $('#button-loc').empty();
  
      for (var i = 0; i < animals.length; i++) {
        var animal = $('<button>').attr({
          class: 'gif-btn',
          type: 'button',
          value: `${animals[i].toLowerCase()}`
        }).text(`${animals[i].toLowerCase()}`);
        $('#button-loc').append(animal);
      }
    }
  
    var generateGif = function () {
      $('#gif-loc').empty();
        var  value = $(this).attr('value');
        var address = "https://api.giphy.com/v1/gifs/search?q=";
        var api_key = "&api_key=q7ymMnvLBzzb95XQhuvrnd1sbllCn2SV&limit=10";
    //Get animal from Gif
      var urlString = address + value + api_key
      // ajax call 
      $.ajax(url = urlString, method = 'GET').then(function (response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
          $('#gif-loc').append(`<p>Rating: ${(response.data[i].rating).toUpperCase()} <br><br> <img class="gif" data-gif_src="${response.data[i].images.downsized_medium.url}" src="${response.data[i].images.downsized_still.url}" alt=""></p>`);
        }
      });
    }
  
    $(document).on('click', 'button', generateGif)
  
    renderer();
  
    $('#search-btn').click(function (event) {
      event.preventDefault();
      animals.push($('#search-input').val().trim().toLowerCase());
      $('#search-input').val('');
      renderer();
    });
  
    $(document).on('click', '.gif', function () {
      $(this).data('img_src', $(this).attr('src'));
      $(this).attr('src', $(this).data('gif_src'));
    });

    function ArrNoDupe(a) {
        var temp = {};
        for (var i = 0; i < a.length; i++)
            temp[a[i]] = true;
        var r = [];
        for (var k in temp)
            r.push(k);
        return r;
    }
  });