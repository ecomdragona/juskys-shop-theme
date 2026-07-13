var interval = setInterval(() => {
  const iframes = document.querySelectorAll(
    "#superchat-widget-content-root iframe"
  );
  iframes.forEach((iframe) => {
    try {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      if (!iframeDocument || !iframeDocument.head) return;

      if (!iframeDocument.querySelector("#custom-style")) {
        const style = iframeDocument.createElement("style");
        style.id = "custom-style";
        style.innerHTML = `
                    #superchat-widget-protected-component-root > div > div{
                    height: 100% !important; 
                    }
                `;
        iframeDocument.head.appendChild(style);
        console.log("Style added to iframe:", iframe);
      }
    } catch (error) {
      console.error("Error accessing iframe:", error);
    }
  });
}, 2000);
window.addEventListener("scroll", function () {
  const siteHeader = document.getElementById("SiteHeader");
  const mobile_search = document.querySelector(
    ".site-header__search-container_mobile"
  );

  if (window.scrollY < 250) {
    siteHeader.classList.remove("site-header--stuck");
    siteHeader.classList.remove("site-header--opening");
    mobile_search.classList.remove("site-header--stuck");
  } else {
    siteHeader.classList.add("site-header--stuck");
    siteHeader.classList.add("site-header--opening");
    mobile_search.classList.add("site-header--stuck");
  }
});

document.addEventListener("DOMContentLoaded", function () {

  // const quantityElement = document.querySelector(
  //   ".product-block-quantity-selector .product__quantity"
  // );
  // const buyButtonsElement = document.querySelector(
  //   ".product-block-buy-buttons"
  // );

  // if (quantityElement && buyButtonsElement) {
  //   buyButtonsElement.appendChild(quantityElement);
  // }
  
  // // ----------- PDP Hide Empty Drop-Down ------------------
  // var accordion_items = document.querySelectorAll("[data-tab-variant]");
  // if (accordion_items.length > 0) {
  //   console.log('emptysaksjaksj');
  //   accordion_items.forEach((tab) => {
  //     const richTextField = tab.querySelector(".metafield-rich_text_field");
  //     const customTab = tab.closest(".custom_tab");
  //     const variantTabDisplay = window.getComputedStyle(tab).display;

  //     if (variantTabDisplay === "block") {
  //       if (richTextField && richTextField.innerHTML.trim() === "") {
  //         customTab.style.display = "none";
  //       }
  //     }
  //   });
  // }

  // const visitCountElement = document.querySelector(".random_visit_count");
  // if (visitCountElement) {
  //   const randomCount = Math.floor(Math.random() * 21) + 10;
  //   visitCountElement.textContent = `${randomCount} Personen`;
  // }

  // const variantIdElement = document.querySelector(
  //   ".product-section-var-b .product-block-buy-buttons [data-product-select]"
  // );
  // if (variantIdElement) {
  //   variantIdElement.addEventListener("change", function () {
  //     const selectedVariantId = variantIdElement.value;
  //     const variantItems = document.querySelectorAll(".variant_bullet_item");
  //     variantItems.forEach(function (item) {
  //       if (item.getAttribute("variant_id") === selectedVariantId) {
  //         item.style.display = "block";
  //       } else {
  //         item.style.display = "none";
  //       }
  //     });
  //   });
  // }

  function checkForElement() {
    const element = document.querySelector(
      'div[data-testid="minimized-trustbadge-floating"]'
    );
    if (element) {
      const grandparent = element.parentElement?.parentElement;
      if (grandparent) {
        grandparent.style.zIndex = "20";
      }
      clearInterval(intervalId);
    }
  }
  const intervalId = setInterval(checkForElement, 100);
  setTimeout(function () {
    clearInterval(intervalId);
  }, 120000);

  // window.addEventListener('scroll', function() {
  //     const scrollThreshold = parseInt(document.body.getAttribute('show_widget'));
  //     const hiddenElement = document.querySelector('.wa__widget_container');

  //     if (window.scrollY > scrollThreshold) {
  //         hiddenElement.style.display = 'block'; // or use hiddenElement.classList.add('visible') if you have a CSS class for it
  //     } else {
  //         hiddenElement.style.display = 'none'; // or use hiddenElement.classList.remove('visible') if you have a CSS class for it
  //     }
  // });

  window.addEventListener("scroll", function () {
    const scrollThreshold =
      parseInt(document.body.getAttribute("show_widget")) || 100;
    const hiddenElement = document.querySelector(".wa__widget_container");

    if (!hiddenElement) return;

    if (window.scrollY > scrollThreshold) {
      hiddenElement.style.display = "block";
    } else {
      hiddenElement.style.display = "none";
    }
  });

  // ------------------ Cart Upsell ---------------------

  // let variantSelectors = document.querySelectorAll(".upsell_variant_selector");
  // var upsellElement = document.querySelector(".upsell_add_to_cart");
  // var first_id = upsellElement.getAttribute("first_variant");
  // var selected_img = document.querySelector(".cart_upsell_item_image img");

  // var upsell_data = {
  //   id: first_id,
  //   quantity: 1,
  // };

  // function updateVariantID() {
  //   let selectedOptions = [];
  //   variantSelectors.forEach((select) => {
  //     selectedOptions.push(select.value);
  //   });

  //   let selectedVariant = window.variants.find((variant) => {
  //     return variant.options.every(
  //       (option, index) => option === selectedOptions[index]
  //     );
  //   });

  //   if (selectedVariant) {
  //     upsell_data.id = selectedVariant.id;
  //     selected_img.setAttribute("src", selectedVariant.featured_image.src);
  //   }
  // }

  // variantSelectors.forEach((select) => {
  //   console.log('chnaged');
  //   select.addEventListener("change", updateVariantID);
  // });

  // upsellElement.addEventListener("click", function () {
  //   upsellElement.classList.add("btn--loading");
  //   upsellElement.setAttribute("disabled", "disabled");

  //   fetch("/cart/add.js", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(upsell_data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       fetch("/cart.js")
  //         .then((response) => response.json())
  //         .then((cart) => {
  //           for (var i = 0; i < cart.item_count; i++) {
  //             if (cart.items[i].id == upsell_data.id) {
  //               document.querySelector(".cart_upsell_main").style.display =
  //                 "none";
  //               break;
  //             }
  //           }
  //           document.dispatchEvent(
  //             new CustomEvent("ajaxProduct:added", {
  //               bubbles: true,
  //             })
  //           );
  //           // setTimeout(function(){
  //           //   var cart_drawer = new theme.CartDrawer
  //           //   cart_drawer.init();
  //           // },500);
  //           // cart_drawer.open();
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // });

  // document.addEventListener("cart:updated", function (evt) {
  //   var product_availabel = false;

  //   fetch("/cart.js")
  //     .then((response) => response.json())
  //     .then((cart) => {
  //       for (var i = 0; i < cart.items.length; i++) {
  //         if (cart.items[i].id === upsell_data.id) {
  //           product_availabel = true;
  //           break;
  //         }
  //       }

  //       if (!product_availabel) {
  //         upsellElement.classList.remove("btn--loading");
  //         upsellElement.removeAttribute("disabled");
  //         document.querySelector(".cart_upsell_main").style.display = "block";
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching cart:", error));
  // });

  // const testmedia = document.querySelector('.product_media__abtest');
  // const originalmedia = document.querySelector('.product_media__original');
    
  // if(testmedia){
  //   testmedia.style.display = 'none';
  //   if(originalmedia) {
  //      originalmedia.style.opacity = '1';
  //   }
  // }else{
  //  if(originalmedia) {
  //       originalmedia.style.opacity = '1';
  //  }
  // }
  
});

document.addEventListener('cart:build', function (event) {
  setTimeout(function(){
    const cartItems = document.querySelector('.drawer__scrollable .cart__items');
    if (cartItems) {
      const cartDiscountAttr = cartItems.getAttribute('data-cart-discount');
  
      const discountElement = document.querySelector('.ajaxcartc__discount');
      if (discountElement) {
        discountElement.textContent = '-' + cartDiscountAttr;
      }
    }
  },1000);
});



$(document).ready(function () {
  setTimeout(function () {
    $(".product_item_image_slider").each(function (index, element) {
      var parentContainer = $(element).closest(".pdp_slider_parent");
      var swiper = new Swiper(element, {
        scrollbar: {
          el: parentContainer.find(".swiper-scrollbar")[0],
          hide: false,
        },
        on: {
          slideChange: function () {
            updateNavigationButtons();
          },
        },
      });

      var card_prevButton = parentContainer.find(".card_btn_prev");
      var card_nextButton = parentContainer.find(".card_btn_next");
      card_prevButton.on("click", function () {
        console.log("clicked");
        swiper.slidePrev();
      });
      card_nextButton.on("click", function () {
        console.log("clicked next");
        swiper.slideNext();
      });
      function updateNavigationButtons() {
        if (swiper.isBeginning) {
          card_prevButton.css("visibility", "hidden");
        } else {
          card_prevButton.css("visibility", "visible");
        }

        if (swiper.isEnd) {
          card_nextButton.css("visibility", "hidden");
        } else {
          card_nextButton.css("visibility", "visible");
        }
      }
      updateNavigationButtons();
    });
  }, 100);

});

const new_observer = new MutationObserver(() => {
  const button = document.querySelector(
    "#ReviewsWidget .R-Button.R-Button--md.R-Button--primary.u-marginBottom--none.u-marginTop--md"
  );

  if (button) {
    button.textContent = "Schreibe eine Bewertung";
    new_observer.disconnect();
    clearTimeout(timeoutId);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const reviewsWidget = document.querySelector("#ReviewsWidget");
  if (reviewsWidget) {
    new_observer.observe(reviewsWidget, { childList: true, subtree: true });
  } else {
    new_observer.observe(document.body, { childList: true, subtree: true });
  }
});

const timeoutId = setTimeout(() => {
  new_observer.disconnect();
  console.log(
    "Stopped observing - Review.io empty review element not found within the time limit."
  );
}, 5000);

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const currentURL = window.location.href;

  if (path.includes("/products/")) {
    if (window.innerWidth > 768) return;

    const addToCartButton = document.querySelector(
      "h1.h2.product-single__title"
    );
    if (!addToCartButton) return;

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    function toggleChatVisibility(superchatWidget) {
      if (isInViewport(addToCartButton)) {
        superchatWidget.style.display = "none";
      } else {
        superchatWidget.style.display = "block";
      }
    }

    function waitForElement(selector, callback) {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
      } else {
        const observer = new MutationObserver((mutations, obs) => {
          const foundElement = document.querySelector(selector);
          if (foundElement) {
            obs.disconnect();
            callback(foundElement);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }

    waitForElement("#superchat-widget", function (superchatWidget) {
      window.addEventListener("scroll", () =>
        toggleChatVisibility(superchatWidget)
      );
      window.addEventListener("resize", () =>
        toggleChatVisibility(superchatWidget)
      );
      toggleChatVisibility(superchatWidget);
    });
  } else if (currentURL.includes("juskys.de")) {
    function waitForElement(selector, callback) {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
      } else {
        const observer = new MutationObserver((mutations, obs) => {
          const foundElement = document.querySelector(selector);
          if (foundElement) {
            obs.disconnect();
            callback(foundElement);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }

    waitForElement(
      ".slideshow-wrapper .flickity-viewport",
      function (targetElement) {
        waitForElement("#superchat-widget", function (superchatWidget) {
          function isFullyOutOfViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.bottom < 0 || rect.top > window.innerHeight;
          }

          function toggleChatVisibility() {
            if (isFullyOutOfViewport(targetElement)) {
              superchatWidget.style.display = "block";
            } else {
              superchatWidget.style.display = "none";
            }
          }

          window.addEventListener("scroll", toggleChatVisibility);
          window.addEventListener("resize", toggleChatVisibility);
          toggleChatVisibility();
        });
      }
    );
  }
});


document.addEventListener('click', function (e) {
  const color_swatch = e.target.closest('.color-swatch-btn');
  if (!color_swatch) return;

  const link = color_swatch.getAttribute('data-variant-link');
  const image = color_swatch.getAttribute('data-variant-image');
  const variant_id = color_swatch.getAttribute('data-variant-id');

  const parent = color_swatch.closest('.grid-product');
  if (!parent) return;

  parent.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.classList.remove('active_swatch_btn');
  });

  color_swatch.classList.add('active_swatch_btn');

  // Update all product links
  parent.querySelectorAll('.grid-product__content a').forEach(el => {
    el.setAttribute('href', link);
  });

  // Hide first image
  const first_img = parent.querySelector('.grid_item_first_img');
  if (first_img) {
    first_img.style.visibility = 'hidden';
  }

  const selectedImage =  parent.querySelector(`.swatch-product__color-image`);
  if(selectedImage){
    selectedImage.style.backgroundImage = 'url(' + image + ')';
    selectedImage.classList.add('active_swatch');
  }

});