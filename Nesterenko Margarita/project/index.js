var some = null;
var jsonDoc = $.getJSON("out.json",
  function (data) {
    var mainresult = [];


    var elements = data.products;
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
      "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    var map = new Map();

    elements.forEach(element => {

      element.date = new Date(element.date).getDate() + " " + monthNames[new Date(element.date).getMonth()];

      var cc = element.price * element.quantity;
      element.cost = cc.toFixed(2)



      if (!map.has(element.date)) {
        map.set(element.date, [element])
      }
      else {
        var mas = map.get(element.date)
        mas.push(element);
        map.set(element.date, mas)
      }

    })


    map.forEach((value, key) => {

      var result = [];

      var map1 = new Map();


      value.forEach(element => {


        if (!map1.has(element.id)) {
          map1.set(element.id, [element]);
        }
        else {
          var mas1 = map1.get(element.id);
          mas1.push(element);
          map1.set(element.id, mas1)
        }

      })
      var costGlobal = 0;
      map1.forEach((value, key) => {

        var cost = value.map(el => parseFloat(el.cost)).reduce((a, b) => a + b);
        result.push({ id: key, data: value, cost: cost.toFixed(2), namerp: value[0].namerp, id: value[0].id })
        costGlobal += cost
      })
      mainresult.push({ date: key, el: result, costGlobal: costGlobal.toFixed(2) })



    })
    some = mainresult

    console.log(mainresult)


    var template = Handlebars.compile(document.getElementById('entry-template').innerHTML);
    var html = template({ mainresult: mainresult })
    console.log(html);

    document.getElementById('here').innerHTML = html;

    const imgs = [
      'img/slider_open.png',
      'img/slider_close.png'
    ]










    // imgEl.addEventListener('click', function () {
    // this.src = srcGen.next().value; 
    // }); 
    // // imgEl.click(); 

    function* imageSrcGenerator(srcArr) {
      let i = -1;
      while (++i < srcArr.length || !(i = 0))
        yield srcArr[i];
    }

    // $('#slider').on('click', function(){
    //   var i=0;
    //   if (this.src=='img/slider_close.png'){
    //     i=0;
    //   }
    //   if (this.src=='img/slider_open.png'){
    //     i=1;
    //   } 
    //   this.src=imgs[i];

    // })

    $(".prihod_rashod_panel").hide();
    $('.li_date').on('click', '.date_name', function (e) {
      e.preventDefault();
             
      $(this)
        .next('.prihod_rashod_panel')
        .not(':animated')
        .slideToggle();

    

      var img = $(this).find("img")
      if(!img[0].open){
        img[0].src = imgs[0]
        img[0].open = true;
      } else {
        img[0].src = imgs[1];
        img[0].open = false;
      }
     
        
      // image.src=imgs[i];
      // console.log(i)
    });

    $('.prihod_rashod_panel').on('click', '.prihod_rashod_name', function (e) { // При щелчке
      e.preventDefault();                    // Отменяет стандартное действие кнопки
      $(this)                                // Получаем нажатый пользователем элемент
        .next('.spisok_tovarov_panel')            // Выбираем следующую панель
        .not(':animated')                    // Если она не в процессе анимации
        .slideToggle();
      // Выводим или скрываем ее с помощью slideToggle()

    });

  })







