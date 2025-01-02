//@prepros-prepend scrollAnim.js
//@prepros-prepend toggle.js
//@prepros-prepend gsapAnim.js

$(document).ready(function () {
  // GSAP //
  gsapAni();
  // gsap.registerPlugin(ScrollTrigger);


  AOS.init({
    once: true // animate once
  });

  $(window).on("scroll", function () {
    AOS.init();
  });

  window.addEventListener('resize', () => {
    AOS.refresh();
    sliderResize();
  });


  // SLIDER
  // ------------------------
  var elms = document.getElementsByClassName('splide');
  var sliders = [];
  var sliderTab;

  for (var i = 0, len = elms.length; i < len; i++) {

    var options = {
      perPage: 1,
      arrows: true,
      pagination: false,
      gap: "0",
    };

    // 最新消息
    if (elms[i].classList.contains('slider-news')) {

      options.perPage = 3;
      options.arrows = true;
      options.gap = "30px";
      options.breakpoints = {
        1680: {
          gap: "20px",
          width: "100%",
        },
        1440: {
          gap: "10px",
          width: "90%",
        },
        1024: {
          width: "90%",
          // perPage: 1,
          // drag: true,
          // gap: 0,
        },
      }
    }

    // Slider ATM
    if (elms[i].classList.contains('slider-atm')) {
      options.perPage = 1;
      options.gap = "24px";
      // 解決拖曳時lightbox無法順利開啟的問題
      options.drag = true;
      options.pagination = true;
    }

    // Slider ATM
    if (elms[i].classList.contains('slider-atm_withdraw')) {
      options.perPage = 1;
      options.gap = "24px";
      // 解決拖曳時lightbox無法順利開啟的問題
      options.drag = true;
      options.pagination = true;
    }

    sliders[i] = new Splide(elms[i], options).mount();
  }

  // Resize
  function sliderResize() {
    for (var i = 0; i < sliders.length; i++) {
      sliders[i].emit('resize');
    }
  }

  // TAB
  // ------------------------
  $('.tabs_btn').click(function () {
    var tabId = $(this).data('tab');
    $('.tabs_btn, .table__con').removeClass('active');
    $(this).addClass('active');
    $('#' + tabId).addClass('active').fadeIn("slow");
    // atm功能介紹內TAB >>永遠顯示第一個子tab
    $('.tabs_btn-vein').removeClass('active-vein');
    $('.tabs_btn-vein:first').addClass('active-vein').click();

    // 無卡服務TAB - step1 >>永遠顯示第一個子tab
    $('.tabs_btn-step1').removeClass('active-step1');
    $('.tabs_btn-step1:first').addClass('active-step1').click();

    // 無卡服務TAB - step2 >>永遠顯示第一個子tab
    $('.tabs_btn-step2').removeClass('active-step2');
    $('.tabs_btn-step2:first').addClass('active-step2').click();

    // 觸發 $('#' + tabId) 內的 splide__pagination 子元素的第一個 li 的 click 事件
    $('#' + tabId + ' .splide__pagination button:first').click();

    sliderResize();
  });

  // atm功能介紹內TAB
  $('.tabs_btn-vein').click(function () {
    var tabId = $(this).data('tab');
    console.log('tabId:', tabId);
    $('.tabs_btn-vein, .table__con-vein').removeClass('active-vein');

    $(this).addClass('active-vein');
    $('#' + tabId).addClass('active-vein').fadeIn("slow");

    // 觸發 $('#' + tabId) 內的 splide__pagination 子元素的第一個 li 的 click 事件
    $('#' + tabId + ' .splide__pagination button:first').click();

    sliderResize();
  });

  // 無卡服務TAB - step1
  $('.tabs_btn-step1').click(function () {
    var tabId = $(this).data('tab');
    $('.tabs_btn-step1, .table__con-step1').removeClass('active-step1');

    $(this).addClass('active-step1');
    $('#' + tabId).addClass('active-step1').fadeIn("slow");

    // 觸發 $('#' + tabId) 內的 splide__pagination 子元素的第一個 li 的 click 事件
    $('#' + tabId + ' .splide__pagination button:first').click();

    sliderResize();
  });

  // 無卡服務TAB - step2
  $('.tabs_btn-step2').click(function () {
    var tabId = $(this).data('tab');
    $('.tabs_btn-step2, .table__con-step2').removeClass('active-step2');

    $(this).addClass('active-step2');
    $('#' + tabId).addClass('active-step2').fadeIn("slow");
    
    // 觸發 $('#' + tabId) 內的 splide__pagination 子元素的第一個 li 的 click 事件
    $('#' + tabId + ' .splide__pagination button:first').click();

    sliderResize();
  });

  // Navbar
  // ------------------------
  $(".nav__trigger").on("click", function () {
    var $nav = $(".nav");
    var $body = $("body");

    if (!$nav.hasClass("nav--active")) {
      $nav.addClass("nav--active");
      $body.addClass("scroll-fixed");
    } else {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    }

    $(".nav__link").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");

    });

    $(".nav__overlay").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    });

  });

  // Scroll 到區塊時 Navbar選單加上active
  // ------------------------
  $(window).on('scroll touchmove', function () {
    var scrollPos = $(this).scrollTop();
    var documentHeight = $(document).height();
    var windowHeight = $(this).height();
    // var connectionHeight = $('#section-connection').height();

    $('section').each(function () {
      var sectionTop = $(this).offset().top - 100;
      var sectionBottom = sectionTop + $(this).height();
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var sectionId = $(this).attr('id');
        $('.nav__link').removeClass('active');
        $('.nav__link[href="#' + sectionId + '"]').addClass('active');
      }
    });

    // Check if at the bottom of the page（解決section-faq高度不足問題）
    // if (scrollPos + windowHeight + connectionHeight + (window.innerWidth <= 768 ? 300 : 0) >= documentHeight) {
    //   $('.nav__link').removeClass('active');
    //   $('.nav__link[href="#section-faq"]').addClass('active');
    // }

    // 置頂時 nav__link 變色
    if (scrollPos === 0) {
      $('.nav__link').removeClass('active');
      $('.nav__link').each(function() {
        if ($(this).attr('title').includes('kv')) {
          $(this).addClass('active');
        }
      });
    }

    // section-faq nav__link 變色
    if (scrollPos + windowHeight >= documentHeight) {
      $('.nav__link').removeClass('active');
      $('.nav__link[href="#section-faq"]').addClass('active');
    }
  });

  // 找ATM 大小網塞不同網址
  const btnFindATM = document.getElementById('btnFindATM');
  const urls = {
    desktop: 'https://bank.sinopac.com/MMA8/CustomerService/BranchService/ATM.html',
    mobile: 'https://m.sinopac.com/m/bank/atm/m_ATM_nearby.aspx'
  };

  // 偵測是否為行動裝置
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // const isMobile = /Mobi/i.test(navigator.userAgent);

  if (btnFindATM) {
    btnFindATM.href = isMobile ? urls.mobile : urls.desktop;
  }
});

//- 小版下拉選單
var titleItem = document.getElementById("titleItem");
var dropdownContent1 = document.getElementById("dropdownContent1");
var dropdownContent2 = document.getElementById("dropdownContent2");
var tabsArrowImg = document.querySelector(".tabs_arrow img");
var tabPhone = document.querySelector(".tab_phone");

// 初始化為關閉狀態
if (dropdownContent1 && dropdownContent2) {
  if (dropdownContent1.style.display === "none") {
    dropdownContent1.style.display = "block";
    dropdownContent2.style.display = "none";
  } else {
    dropdownContent1.style.display = "none";
    dropdownContent2.style.display = "block";
  }
}


// 切換顯示狀態
// $(dropdownContent1).hide(); >>用展開的下拉選單來判斷是否需要收合
function toggleDropdown() {
  if ($(dropdownContent1).is(":visible")) {
    $(dropdownContent1).fadeOut('fast');
    $(dropdownContent1).hide();
    $(dropdownContent2).show();
    $(titleItem).show(); // 顯示標題
    $(tabsArrowImg).css("transform", "rotate(0deg)"); // 箭頭初始化
    $(tabPhone).css("padding", ""); // 修改 padding
  } else {
    $(dropdownContent1).fadeIn('fast');
    $(dropdownContent1).show();
    $(dropdownContent2).hide();
    $(titleItem).hide(); // 隱藏標題
    $(tabsArrowImg).css("transform", "rotate(90deg)"); // 箭頭旋轉
    $(tabPhone).css("padding", "0"); // 修改 padding
  }
}

// 選擇項目並關閉選單
function selectItem(item) {
  titleItem.textContent = item; // 更新標題
  titleItem.style.display = "block";
  tabsArrowImg.style.transform = "rotate(0deg)";
  tabPhone.style.padding = ""; // 修改 padding
}

