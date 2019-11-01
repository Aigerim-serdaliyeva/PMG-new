$(document).ready(function () {

  var $wnd = $(window);
  var $header = $('.header');
  var $html = $("html, body");
  var $header = $(".header");
  var $menu = $(".main-menu");
  var headerHeight = 99;
  var $hamburger = $(".hamburger");

  $('.lang').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.burger-menu__btn').click(function(e) {
    e.preventDefault();
    $(this).closest('.page-wrapper').find('.header').addClass('active');
  });

  $(".header__close").click(function() {
    $(this).closest(".header").removeClass('active');
  });


  let isWorkAnimePlayed = false;

  const workAnime = anime.timeline({
    targets: ".s-work__content",
    easing: 'linear',
    loop: false,
    autoplay: false
  });

  function getSvgAnime(targets) {
    return {
      targets: targets,
      width: [0, 200],
      duration: 400
    };
  }

  function getWorkAnime(targets) {
    return {
      targets: targets,
      keyframes: [
        {
          opacity: 1,
          duration: 200,
        },
        {
          scale: 1.1
        },
        {
          scale: 1
        },
      ],
      duration: 400
    };
  }

    workAnime
    .add(getWorkAnime('.work__content--1'))
    .add(getSvgAnime(".work__svg--1"))
    .add(getWorkAnime('.work__content--2'))
    .add(getSvgAnime(".work__svg--2"))
    .add(getWorkAnime('.work__content--3'))
    .add({
      targets: ".work__svg--3 .work__svg__content",
      opacity: 1,
      width: [0, 894],
      duration: 1000
    })
    .add(getWorkAnime('.work__content--4'))
    .add(getSvgAnime(".work__svg--4"))
    .add(getWorkAnime('.work__content--5'))
    .add(getSvgAnime(".work__svg--5"))
    .add(getWorkAnime('.work__content--6'));


  

  // забираем utm из адресной строки и пишем в sessionStorage, чтобы отправить их на сервер при form submit
  // var utms = parseGET();
  // // проверяем есть ли utm в адресной строке, если есть то пишем в sessionStorage
  // if (utms && Object.keys(utms).length > 0) {
  //   window.sessionStorage.setItem('utms', JSON.stringify(utms));
  // } else {
  //   // если нет то берем utm из sessionStorage
  //   utms = JSON.parse(window.sessionStorage.getItem('utms') || "[]");
  // }

  // jquery.maskedinput для ПК и планшет (мобильном не подключаем)
  if ($wnd.width() > 479) {
    $("input[type=tel]").mask("+7 (999) 999 99 99", {
      completed: function () {
        $(this).removeClass('error');
      }
    });
  }

  $wnd.scroll(function () { onscroll(); });

  var onscroll = function () {
    if ($wnd.scrollTop() > 0) {
      $header.addClass('header--scrolled');
      $('.header__mobile').addClass('scroll');
    } else {
      $header.removeClass('header--scrolled');
      $('.header__mobile').removeClass('scroll');
    }

    if ($wnd.scrollTop() > $('.s-work').offset().top && !isWorkAnimePlayed && $wnd.width() > 991) {
      workAnime.play();
      isWorkAnimePlayed = true;  
    } 

    var scrollPos = $wnd.scrollTop() + headerHeight;

    // добавляет клас active в ссылку меню, когда находимся на блоке, куда эта ссылка ссылается
    $menu.find(".link").each(function () {
      var link = $(this);
      var id = link.find('a').attr('href');

      if (id.length > 1 && id.charAt(0) == '#' && $(id).length > 0) {
        var section = $(id);
        var sectionTop = section.offset().top;

        if (sectionTop <= scrollPos && (sectionTop + section.height()) >= scrollPos) {
          link.addClass('active');
        } else {
          link.removeClass('active');
        }
      }
    });
  }

  onscroll();

  // при нажатии на меню плавно скролит к соответсвующему блоку
  $(".main-menu .link a").click(function (e) {
    var $href = $(this).attr('href');
    if ($href.length > 1 && $href.charAt(0) == '#' && $($href).length > 0) {
      e.preventDefault();
      // отнимаем высоту шапки, для того чтобы шапка не прикрывала верхнию часть блока
      var top = $($href).offset().top - headerHeight;
      $html.stop().animate({ scrollTop: top }, "slow", "swing");
    }

    // как только доходим до блока, скрываем меню
    if ($wnd.width() <= 991) {
      toggleHamburger();
    }
  });


  // при изменении объязателных полей проверяем можно ли удалять класс error
  $("input:required, textarea:required").keyup(function () {
    var $this = $(this);
    if ($this.attr('type') != 'tel') {
      checkInput($this);
    }
  });

  $hamburger.click(function () {
    toggleHamburger();
    return false;
  });

  // показывает и скрывает меню, а также меняет состояние гамбургера
  function toggleHamburger() {
    $this = $hamburger;
    if (!$this.hasClass("is-active")) {
      $this.addClass('is-active');
      $menu.slideDown('700');
    } else {
      $this.removeClass('is-active');
      $menu.slideUp('700');
    }
  }

  // при закрытии модального окна удаляем error клас формы в модальном окне
  $(document).on('closing', '.remodal', function (e) {
    $(this).find(".input, .textarea").removeClass("error");
    var form = $(this).find("form");
    if (form.length > 0) {
      form[0].reset();
    }
  });


});

// Internalization
      
  const i18n = new VueI18n({
    locale: 'ru', // set locale
    messages, // set locale messages
  })      

  new Vue({ 
    el: '#app',
    i18n,
    methods: {
      changeLang(lang) {
        this.$root.$i18n.locale = lang  
      }
    }      
  })
// Internalization end