'use strict';

// Description-slider
(function () {
  var descriptionSlider = document.querySelector('.description__slider');
  
  if (descriptionSlider !== null) {
    $(document).ready(function(){
      $(".description__slider").owlCarousel({
        loop: true,
        items: 1,
        animateOut: 'fadeOut',
        slideTransition: 'ease',
        smartSpeed: 350,
        autoplay: false,
        nav: true
      });
    });
  };
})();

(function () {
  $(document).ready(function(){
    $(".page-content__features-slider-wrap").owlCarousel({
      slideTransition: 'ease',
      smartSpeed: 200,
      autoplay: false,
      nav: true,
      responsive: {
        1920: {
          items: 6
        },
        1650: {
          items: 5
        },
        1350: {
          items: 4
        },
        1090: {
          items: 3
        },
        1089: {
          items: 2
        },
        870: {
          items: 2
        },
        650: {
          items: 3
        },
        400: {
          items: 1
        },
        320: {
          items: 1
        }
      }
    });
  });
})();

// Main-nav
(function () {
  var nav = document.querySelector('nav');
  var tel = nav.querySelector('.main-nav__items--tel');
  var pageHeader = document.querySelector('.page-header');
  var catalog = document.querySelector('.main-nav__headline-link--catalog');
  var buy = document.querySelector('.main-nav__headline-link--buy');
  var catalogDropDown = catalog.querySelector('.main-nav__drop-down--catalog');
  var buyDropDown = buy.querySelector('.main-nav__drop-down--buy');
  
  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  };
  
  var closeMenu = function () {
    catalog.classList.remove('main-nav__headline-link--clicked');
    catalogDropDown.classList.add('hidden');
    buy.classList.remove('main-nav__headline-link--clicked');
    buyDropDown.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };
  
  var onEscPress = function (evt) {
    var escKeyCode = 27;
    
    if (evt.keyCode === escKeyCode) {
      closeMenu();
    }
  };
  
  catalog.addEventListener('click', function (evt) {
    evt.preventDefault();
    buy.classList.remove('main-nav__headline-link--clicked');
    buyDropDown.classList.add('hidden');
    this.classList.toggle('main-nav__headline-link--clicked');
    catalogDropDown.classList.toggle('hidden');
    document.addEventListener('keydown', onEscPress);
  });
  
  buy.addEventListener('click', function (evt) {
    evt.preventDefault();
    catalog.classList.remove('main-nav__headline-link--clicked');
    catalogDropDown.classList.add('hidden');
    this.classList.toggle('main-nav__headline-link--clicked');
    buyDropDown.classList.toggle('hidden');
    document.addEventListener('keydown', onEscPress);
  });
  
  document.addEventListener('scroll', function () {
    var pos = nav.getBoundingClientRect();
    var ph = pageHeader.getBoundingClientRect();
    var docPosition = document.documentElement.scrollTop;
    
    if (pos.top <= 0) {
      nav.classList.add('main-nav--sticky');
      tel.classList.remove('hidden');
      pageHeader.classList.add('page-header--sticky');
    } 
    
    if (docPosition < 119) {
      nav.classList.remove('main-nav--sticky');
      tel.classList.add('hidden');
      pageHeader.classList.remove('page-header--sticky');
    }
  });
})();

// Carts
(function () {
  var cartControls = document.querySelectorAll('.carts__good-controls-wrap');
  var cartPrice = document.querySelector('.carts__good-price');
  var basketContainer = document.querySelector('.main-nav__headline-link--basket');
  var basketCount = basketContainer.querySelector('.main-nav__basket-goods');
  var basketTextCount = document.querySelector('.main-nav__basket-text--count');
  var basketPrice = basketContainer.querySelector('.main-nav__basket-num');
  var tableCarts = document.querySelectorAll('.page-content__table-td--basket');
  var basketCart = document.querySelectorAll('.order__basket-tr--basket');
  var basketTablePrice = document.querySelector('.order__total-price-num');
  
  
  for (var i = 0, len = cartControls.length; i < len; i++) {
    cartControls[i].addEventListener('click', function (evt) {
      var target = this;
      var price = evt.target.closest('.carts__good-basic-price');
      var cartPrice = target.querySelector('.carts__good-price');
      var cartCount = target.querySelector('.carts__good-control-number');
      var dec = evt.target.closest('.carts__good-control-button--dec');
      var inc = evt.target.closest('.carts__good-control-button--inc');
      var add = evt.target.closest('.carts__good-buy');
      
      if (price) {
        if (price.textContent === '0,8 кг') {
          cartPrice.textContent = 600;
          this.dataset.basicPrice = 600;
          this.dataset.count = 1;
          cartCount.textContent = this.dataset.count;
        } else if (price.textContent === '1,0 кг') {
          cartPrice.textContent = 750;
          this.dataset.basicPrice = 750;
          this.dataset.count = 1;
          cartCount.textContent = this.dataset.count;
        } else if (price.textContent === '1,2 кг') {
          cartPrice.textContent = 900;
          this.dataset.basicPrice = 900;
          this.dataset.count = 1;
          cartCount.textContent = this.dataset.count;
        } else if (price.textContent === '1,4 кг') {
          cartPrice.textContent = 1050;
          this.dataset.basicPrice = 1050;
          this.dataset.count = 1;
          cartCount.textContent = this.dataset.count;
        }
      };
      
      if (dec) {
        if (parseInt(cartCount.textContent, 10) > 1) {
          cartCount.textContent = parseInt(cartCount.textContent, 10) - 1;
          this.dataset.count = parseInt(this.dataset.count, 10) - 1;
          cartPrice.textContent = parseInt(this.dataset.totalPrice, 10) - parseInt(this.dataset.basicPrice, 10);
          this.dataset.totalPrice = cartPrice.textContent;
        }
      };
      
      if (inc) {
        cartCount.textContent = parseInt(cartCount.textContent, 10) + 1;
        this.dataset.count = parseInt(this.dataset.count, 10) + 1;
        cartPrice.textContent = parseInt(this.dataset.count, 10) * parseInt(this.dataset.basicPrice, 10);
        this.dataset.totalPrice = cartPrice.textContent;
      };
      
      if (add) {
        basketCount.textContent = parseInt(basketCount.textContent, 10) + parseInt(cartCount.textContent, 10);
        basketPrice.textContent = parseInt(basketPrice.textContent, 10) + parseInt(cartPrice.textContent, 10);
      }
    });
  }
  
  for (var j = 0, jLen = tableCarts.length; j < jLen; j++) {
    tableCarts[j].addEventListener('click', function (evt) {
      var btn = evt.target.closest('.page-content__table-button');
      
      if (btn) {
        basketCount.textContent = parseInt(basketCount.textContent, 10) + parseInt(this.dataset.count, 10);
        basketPrice.textContent = parseInt(basketPrice.textContent, 10) + parseInt(this.dataset.basicPrice, 10);
      }
    });
  }
  
  var getTableCartTotalPrice = function (elem) {
    var totalPrice = 0;
    
    for (var i = 0, len = elem.length; i < len; i++) {
      totalPrice = parseInt(elem[i].dataset.totalPrice, 10) + totalPrice;
    }
    return totalPrice;
  };
  
  var getTableCartTotalCount = function (elem) {
    var totalCount = 0;
    
    for (var i = 0, len = elem.length; i < len; i++) {
      totalCount = parseInt(elem[i].dataset.count, 10) + totalCount;
    }
    return totalCount;
  };
  
  if (basketCart !== null && basketTablePrice !== null) {
    basketTablePrice.textContent = getTableCartTotalPrice(basketCart);
    basketCount.textContent = getTableCartTotalCount(basketCart);
    basketPrice.textContent = getTableCartTotalPrice(basketCart);
    
    if (getTableCartTotalCount(basketCart) === 0 || getTableCartTotalCount(basketCart) > 4) {
      basketTextCount.textContent = 'товаров';
    }
    if (getTableCartTotalCount(basketCart) === 1) {
      basketTextCount.textContent = 'товар';
    }
    if (getTableCartTotalCount(basketCart) > 1 && getTableCartTotalCount(basketCart) <= 4) {
      basketTextCount.textContent = 'товара';
    }
  }
  
  for (var y = 0, yLen = basketCart.length; y < yLen; y++) {
    basketCart[y].addEventListener('click', function (evt) {
      var basicPrice = parseInt(this.dataset.basicPrice, 10);
      var totalPrice = parseInt(this.dataset.totalPrice, 10);
      var controlNumber = this.querySelector('.order__basket-control-number');
      var basketTotalPrice = this.querySelector('.order__basket-good-price--total');
      var inc = evt.target.closest('.order__basket-control--inc');
      var dec = evt.target.closest('.order__basket-control--dec');
      var cancel = evt.target.closest('.order__basket-cart-cancel');
      
      if (inc) {
        if (parseInt(controlNumber.textContent, 10) > 1) {
          controlNumber.textContent = parseInt(controlNumber.textContent, 10) - 1;
          basketTotalPrice.textContent = parseInt(basketTotalPrice.textContent, 10) - basicPrice;
          this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) - parseInt(this.dataset.basicPrice, 10);
          this.dataset.count = parseInt(this.dataset.count, 10) - 1;
          basketTablePrice.textContent = getTableCartTotalPrice(basketCart);
          basketCount.textContent = getTableCartTotalCount(basketCart);
          basketPrice.textContent = getTableCartTotalPrice(basketCart);
          if (getTableCartTotalCount(basketCart) === 0 || getTableCartTotalCount(basketCart) > 4) {
            basketTextCount.textContent = 'товаров';
          }
          if (getTableCartTotalCount(basketCart) === 1) {
            basketTextCount.textContent = 'товар';
          }
          if (getTableCartTotalCount(basketCart) > 1 && getTableCartTotalCount(basketCart) <= 4) {
            basketTextCount.textContent = 'товара';
          }
        }
      }
      if (dec) {
        controlNumber.textContent = parseInt(controlNumber.textContent, 10) + 1;
        basketTotalPrice.textContent = parseInt(basketTotalPrice.textContent, 10) + basicPrice;
        this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) + parseInt(this.dataset.basicPrice, 10);
        this.dataset.count = parseInt(this.dataset.count, 10) + 1;
        basketTablePrice.textContent = getTableCartTotalPrice(basketCart);
        basketCount.textContent = getTableCartTotalCount(basketCart);
        basketPrice.textContent = getTableCartTotalPrice(basketCart);
        if (getTableCartTotalCount(basketCart) === 0 || getTableCartTotalCount(basketCart) > 4) {
          basketTextCount.textContent = 'товаров';
        }
        if (getTableCartTotalCount(basketCart) === 1) {
          basketTextCount.textContent = 'товар';
        }
        if (getTableCartTotalCount(basketCart) > 1 && getTableCartTotalCount(basketCart) <= 4) {
          basketTextCount.textContent = 'товара';
        }
      }
      if (cancel) {
        this.remove();
        this.dataset.totalPrice = 0;
        this.dataset.count = 0;
        basketTablePrice.textContent = getTableCartTotalPrice(basketCart);
        basketCount.textContent = getTableCartTotalCount(basketCart);
        basketPrice.textContent = getTableCartTotalPrice(basketCart);
        if (getTableCartTotalCount(basketCart) === 0 || getTableCartTotalCount(basketCart) > 4) {
          basketTextCount.textContent = 'товаров';
        }
        if (getTableCartTotalCount(basketCart) === 1) {
          basketTextCount.textContent = 'товар';
        }

        if (getTableCartTotalCount(basketCart) > 1 && getTableCartTotalCount(basketCart) <= 4) {
          basketTextCount.textContent = 'товара';
        }
      }
    });
  }
})();

// Cart inner
(function () {
  var shareBtn = document.querySelector('.carts__good-inner-share');
  var share = document.querySelector('.carts__good-inner-socials');
  
  if (shareBtn !== null && share !== null) {
    shareBtn.addEventListener('click', function () {
      this.classList.toggle('carts__good-inner-share--clicked');
      share.classList.toggle('hidden');
    });
  }
})();

// Range
(function () {
  var range = document.querySelector('.filter__range');
  
  var setRange = function (elem) {
    var val = parseInt(elem.value, 10);
    var result = Math.abs(val - 100);
    
    return result;
  }; 
  
  range.addEventListener('input', function () {
    this.style.backgroundImage = '-webkit-linear-gradient(right, #fc471e 0%, #fc471e ' + setRange(this) + '%, #eaeaea ' + setRange(this) + '%, #eaeaea 100%)';
  });
})();
