function update_selector() {
  setTimeout(() => {
    const $selectors = $('.upsell_variant_selector');
    if ($selectors.length) {
      $selectors.trigger('change');
    }
  }, 1500);
}


$(document).ready(function () {

  setTimeout(() => {
    $('.subcollection-desktop-only').css('display', 'block');
  }, 1500);
  
  $(document).on("click", ".color_swatch_filter", function () {
    let active_color = $(this).attr("filter_value");
    // console.log("active_color:", active_color);
    let target = $(`.tag--swatch .tag__checkbox-wrapper[filter_value="${active_color}"]`).first();
    target.click();
  });

  //------------------------- Bundle App Code -------------------------------

  var interval = setInterval(function () {
    var frequently_bought_item = document.querySelectorAll(
      ".cbb-recommendations-variant-select"
    );
    var checkboxes = document.querySelectorAll(
      ".cbb-frequently-bought-selector-input"
    );
    var addButton = document.querySelector(".cbb-frequently-bought-add-button");

    if (frequently_bought_item.length > 0) {
      // Add default option to all the select elements
      frequently_bought_item.forEach(function (item) {
        var option = document.createElement("option");
        option.value = "select_option";
        option.textContent = "Größe auswählen";
        item.insertBefore(option, item.firstChild);
        item.selectedIndex = 0;
        var itemShippingElement = document.createElement("div");
        itemShippingElement.classList.add("item_shipping_element");
        item.closest("li").appendChild(itemShippingElement);
        append_shipping(item);
      });

      addButton.setAttribute("disabled", true);
      addButton.style.opacity = "0.5";

      clearInterval(interval);

      // Handle the 'change' event for each select element
      frequently_bought_item.forEach(function (item) {
        item.addEventListener("change", function () {
          var selectOption = item.querySelector(
            'option[value="select_option"]'
          );
          if (selectOption) {
            selectOption.remove();
          }

          addButton.removeAttribute("disabled");
          addButton.style.opacity = "1";

          append_shipping(item);

          checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
              var selectElement = checkbox
                .closest("li")
                .querySelector(".cbb-recommendations-variant-select");
              if (selectElement && selectElement.value == "select_option") {
                addButton.setAttribute("disabled", true);
                addButton.style.opacity = "0.5";
              }
            }
          });
        });
      });

      // Handle checkbox change event
      checkboxes.forEach(function (item) {
        item.addEventListener("change", function () {
          setTimeout(function () {
            var selected = [];
            frequently_bought_item.forEach(function (child) {
              const li_element = child.closest("li");
              const li_opacity = window.getComputedStyle(li_element).opacity;
              if (li_opacity == "1") {
                selected.push(child.value);
              }
            });
            console.log(selected);
            if (selected.includes("select_option")) {
              addButton.setAttribute("disabled", true);
              addButton.style.opacity = "0.5";
            } else {
              addButton.removeAttribute("disabled");
              addButton.style.opacity = "1";
            }
          }, 500);
        });
      });

      function append_shipping(item) {
        var active_link = item
          .closest("li")
          .querySelector(".cbb-frequently-bought-selector-link");
        if (active_link) {
          (async () => {
            const response = await fetch(active_link);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const deliveryTimeElement = doc.querySelector(
              ".product-block.product-block--delivery_time"
            );
            item
              .closest("li")
              .querySelector(".item_shipping_element").innerHTML =
              deliveryTimeElement.outerHTML;
          })();
        } else {
          var shipping_element = document.querySelector(
            "[data-product-blocks] .product-block--delivery_time"
          ).outerHTML;
          item.closest("li").querySelector(".item_shipping_element").innerHTML =
            shipping_element;
        }
      }
    }
  }, 200);

  setTimeout(function () {
    clearInterval(interval);
    console.log("The elements were not found within 1 minute.");
  }, 60000); // 1 minute

  // ----------- PDP Hide Empty Drop-Down ------------------
  var accordion_items = document.querySelectorAll("[data-tab-variant]");
  if (accordion_items.length > 0) {
    console.log("emptysaksjaksj");
    accordion_items.forEach((tab) => {
      const richTextField = tab.querySelector(".metafield-rich_text_field");
      const customTab = tab.closest(".custom_tab");
      const variantTabDisplay = window.getComputedStyle(tab).display;

      if (variantTabDisplay === "block") {
        if (richTextField && richTextField.innerHTML.trim() === "") {
          customTab.style.display = "none";
        }
      }
    });
  }
  var data_tabs = document.querySelectorAll("[data-tab-layout-variant]");
  if (data_tabs.length > 0) {
    data_tabs.forEach((variantTab) => {
      const richTextField = variantTab.querySelector(
        ".metafield-rich_text_field"
      );
      const customTabId = variantTab
        .closest(".tab_content_main")
        ?.getAttribute("id");
      const tab_ = document
        .querySelector('.variant-tabs-nav a[href="#' + customTabId + '"]')
        ?.closest("li");
      const variantTabDisplay = window.getComputedStyle(variantTab).display;

      if (richTextField && richTextField.innerHTML.trim() === "") {
        if (variantTabDisplay === "block") {
          tab_.style.display = "none";
        }
      }
    });
  }

  // --------------------------------------- Cart Upsell ---------------------------------------

  var upsellElement = $(".upsell_add_to_cart");
  var first_id = upsellElement.length
    ? upsellElement.attr("first_variant")
    : null;

  // function updateVariantID() {
  //   var selectedOptions = [];
  //   $(".upsell_variant_selector").each(function () {
  //     selectedOptions.push($(this).val());
  //   });

  //   var variantsJson = $(".upsell_variants_data").attr("upsell_variants");
  //   var upsell_variants;
  //   try {
  //     upsell_variants = JSON.parse(variantsJson);
  //   } catch (e) {
  //     console.error("Invalid JSON in upsell_variants:", e);
  //     return;
  //   }

  //   var selectedVariant = upsell_variants.find(function (variant) {
  //     return variant.options.every(function (option, index) {
  //       return option === selectedOptions[index];
  //     });
  //   });

  //   if (selectedVariant) {
  //     if(selectedVariant.available){
  //       $('.upsell_add_to_cart').text('HINZUFÜGEN').removeClass('sold_out_btn');
  //     }else{
  //       $('.upsell_add_to_cart').text('AUSVERKAUFT').addClass('sold_out_btn');
  //     }
  //     $(".upsell_add_to_cart").attr("first_variant", selectedVariant.id);
  //     $(".cart_upsell_item_image img").attr(
  //       "src",
  //       selectedVariant.featured_image.src
  //     );
  //     document.querySelector(".upsell_Item__price").innerText = (
  //       selectedVariant.price / 100
  //     )
  //       .toFixed(2)
  //       .replace(".", ",");
  //   }
  // }

  function updateVariantID() {
      var selectedOptions = [];
      $(".upsell_variant_selector").each(function () {
        selectedOptions.push($(this).val());
      });
    
      var variantsJson = $(".upsell_variants_data").attr("upsell_variants");
      var upsell_variants;
      try {
        upsell_variants = JSON.parse(variantsJson);
      } catch (e) {
        console.error("Invalid JSON in upsell_variants:", e);
        return;
      }
    
      // Update Add to Cart Button & Price
      var selectedVariant = upsell_variants.find(function (variant) {
        return variant.options.every(function (option, index) {
          return option === selectedOptions[index];
        });
      });
    
      if (selectedVariant) {
        if (selectedVariant.available) {
          $('.upsell_add_to_cart').text('HINZUFÜGEN').removeClass('sold_out_btn');
        } else {
          $('.upsell_add_to_cart').text('AUSVERKAUFT').addClass('sold_out_btn');
        }
    
        $(".upsell_add_to_cart").attr("first_variant", selectedVariant.id);
        $(".cart_upsell_item_image img").attr("src", selectedVariant.featured_image.src);
        document.querySelector(".upsell_Item__price").innerText = (selectedVariant.price / 100).toFixed(2).replace(".", ",");
      }
    
      // Dynamically disable other selectors' options
      $(".upsell_variant_selector").each(function (index, currentSelect) {
        var currentValue = $(currentSelect).val();
    
        $(".upsell_variant_selector").each(function (otherIndex, otherSelect) {
          if (index === otherIndex) return; // skip same selector
    
          var currentSelectionCopy = [...selectedOptions];
          var $otherSelect = $(otherSelect);
          var originalOptions = $otherSelect.data("original-options");
    
          if (!originalOptions) {
            // Store original options only once
            $otherSelect.data("original-options", $otherSelect.find("option").clone());
            originalOptions = $otherSelect.data("original-options");
          }
    
          $otherSelect.find("option").each(function () {
            const $opt = $(this);
            const optionValue = $opt.val();
    
            currentSelectionCopy[otherIndex] = optionValue;
    
            const match = upsell_variants.find(function (variant) {
              return variant.options.every((opt, i) => opt === currentSelectionCopy[i] && variant.available);
            });
    
            if (match) {
              $opt.prop("disabled", false);
            } else {
              $opt.prop("disabled", true);
            }
          });
    
          // If current selection is disabled, auto switch to first non-disabled
          if ($otherSelect.find("option:selected").prop("disabled")) {
            const firstValid = $otherSelect.find("option:not(:disabled)").first();
            $otherSelect.val(firstValid.val());
            selectedOptions[otherIndex] = firstValid.val();
          }
        });
      });
    }

  $(document).on("change", ".upsell_variant_selector", updateVariantID);
  update_selector();

  $(document).on("click", ".upsell_add_to_cart", function () {
    var $btn = $(this);
    var first_id = $btn.attr("first_variant");

    // if (!upsell_data.id) {
    //   upsell_data.id = first_id;
    // }

    let upsell_data = {
      id: first_id,
      quantity: 1,
    };

    $btn.addClass("btn--loading").attr("disabled", "disabled");

    $.ajax({
      url: "/cart/add.js",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(upsell_data),
      success: function (data) {
        $.getJSON("/cart.js", function (cart) {
          for (var i = 0; i < cart.item_count; i++) {
            if (cart.items[i].id == first_id) {
              $(".cart_upsell_main").hide();
              break;
            }
          }
          document.dispatchEvent(
            new CustomEvent("ajaxProduct:added", { bubbles: true })
          );
        });
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });

  // --------------------------------------- End Cart Upsell ---------------------------------------

  // var variantSelectors = $(".upsell_variant_selector");
  // var upsellElement = $(".upsell_add_to_cart");
  // var first_id = upsellElement.attr("first_variant");
  // var selected_img = $(".cart_upsell_item_image img");
  // var selected_price = document.querySelector('.upsell_Item__price');

  // var upsell_data = {
  //   id: first_id,
  //   quantity: 1,
  // };

  // function updateVariantID() {
  //   let selectedOptions = [];
  //   variantSelectors.each(function() {
  //     selectedOptions.push($(this).val());
  //   });

  //   let selectedVariant = window.variants.find(function(variant) {
  //     return variant.options.every(function(option, index) {
  //       return option === selectedOptions[index];
  //     });
  //   });

  //   if (selectedVariant) {
  //     upsell_data.id = selectedVariant.id;
  //     selected_img.attr("src", selectedVariant.featured_image.src);
  //     selected_price.innerText = (selectedVariant.price / 100).toFixed(2);
  //   }
  // }

  // variantSelectors.each(function() {
  //   $(this).on("change", updateVariantID);
  // });

  // upsellElement.on("click", function() {
  //   upsellElement.addClass("btn--loading");
  //   upsellElement.attr("disabled", "disabled");

  //   $.ajax({
  //     url: "/cart/add.js",
  //     method: "POST",
  //     contentType: "application/json",
  //     data: JSON.stringify(upsell_data),
  //     success: function(data) {
  //       $.getJSON("/cart.js", function(cart) {
  //         for (var i = 0; i < cart.item_count; i++) {
  //           if (cart.items[i].id == upsell_data.id) {
  //             $(".cart_upsell_main").hide();
  //             break;
  //           }
  //         }
  //         // $(document).trigger("ajaxProduct:added");
  //         new CustomEvent("ajaxProduct:added", {
  //               bubbles: true,
  //             });
  //       });
  //     },
  //     error: function(error) {
  //       console.error("Error:", error);
  //     }
  //   });
  // });

  $(document).on("cart:updated", function (evt) {
    console.log("added");
    var product_available = false;

    $.getJSON("/cart.js", function (cart) {
      for (var i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id === upsell_data.id) {
          product_available = true;
          break;
        }
      }

      if (!product_available) {
        upsellElement.removeClass("btn--loading");
        upsellElement.removeAttr("disabled");
        $(".cart_upsell_main").show();
      }
    }).fail(function (error) {
      console.error("Error fetching cart:", error);
    });
  });

  setTimeout(function () {
    if ($(".product_item_image_slider").length > 0) {
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
    }
  }, 300);

  // ----------------------- Buy Box Price Mutation ----------------------

  const targetElement = document.querySelector(
    ".product-section-var-a .product-block--price"
  );
  if (targetElement) {
    const observer = new MutationObserver(function (mutationsList, observer) {
      mutationsList.forEach(function (mutation) {
        if (
          mutation.type === "childList" ||
          mutation.type === "subtree" ||
          mutation.type === "characterData"
        ) {
          const targetCopyElement = document.querySelector(
            ".product-section-var-b .product-block--price"
          );
          if (targetCopyElement) {
            targetCopyElement.innerHTML = targetElement.innerHTML;
          }
        }
      });
    });
    observer.observe(targetElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  //---------------------- Buy Box random Visitors -------------------

  const visitCountElement = document.querySelector(".random_visit_count");
  const randomVisitorsCount = document.querySelector(".random_visitors_count");
  let visitCountElement_id =
    visitCountElement
      ?.closest(".random_visit_text")
      .getAttribute("product_id") || "";
  if (visitCountElement_id === "") {
    visitCountElement_id =
      randomVisitorsCount
        ?.closest(".random_visitors_main")
        .getAttribute("product_id") || "";
  }

  if (visitCountElement || randomVisitorsCount) {
    const storageKey = "randomVisitCount" + visitCountElement_id;
    const timeKey = "randomVisitCountTime" + visitCountElement_id;
    const oneHour = 60 * 60 * 1000;

    const now = Date.now();
    const savedCount = localStorage.getItem(storageKey);
    const savedTime = localStorage.getItem(timeKey);

    if (savedCount && savedTime && now - Number(savedTime) < oneHour) {
      if (visitCountElement) {
        visitCountElement.textContent = `${savedCount} Personen`;
        const wrapper = visitCountElement.closest(".random_visit_text");
        wrapper.classList.remove("hide_random");
      }
      if (randomVisitorsCount) {
        randomVisitorsCount.textContent = savedCount;
        const wrapper = randomVisitorsCount.closest(".random_visitors_main");
        wrapper.classList.remove("hide_random");
      }
    } else {
      const randomCount = Math.floor(Math.random() * (400 - 20 + 1)) + 20;
      if (visitCountElement) {
        visitCountElement.textContent = `${randomCount} Personen`;
        const wrapper = visitCountElement.closest(".random_visit_text");
        wrapper.classList.remove("hide_random");
      }
      if (randomVisitorsCount) {
        randomVisitorsCount.textContent = randomCount;
        const wrapper = randomVisitorsCount.closest(".random_visitors_main");
        wrapper.classList.remove("hide_random");
      }
      localStorage.setItem(storageKey, randomCount);
      localStorage.setItem(timeKey, now.toString());
    }
  }

  //----------------------- Update Discount Value ----------------------
  function parsePrice(priceString) {
    let cleaned = priceString.replace(/[^\d.,-]/g, "");
    if (cleaned.includes(".") && cleaned.includes(",")) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else if (cleaned.includes(",")) {
      cleaned = cleaned.replace(",", ".");
    }
    return parseFloat(cleaned);
  }

  $(document).on("change", ".elsklip-coupon__text input", function () {
    let parentElement = $(this).closest(".product-single__meta");
    let _this = $(this);
    setTimeout(function () {
      if (_this.is(":checked")) {
        let compare_Price = parsePrice(
          parentElement.find(".product__price.product__price--compare").text()
        );
        let regular_Price = parsePrice(
          parentElement.find(".elsklip-discounted-price").text()
        );

        let differance = parseFloat(compare_Price - regular_Price)
          .toFixed(2)
          .replace(".", ",");
       
        parentElement
          .find("[data-product-price]")
          .text(regular_Price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+" €");
        
        parentElement
          .find(".saving_value_text_pdp")
          .text("-" + differance + " €");
      } else {
        let compare_Price = parsePrice(
          $(parentElement)
            .find(".product__price.product__price--compare")
            .text()
        );
        let regular_Price = parsePrice(
          $(parentElement).find("[data-product-price]").data("price")
        );
        parentElement
          .find("[data-product-price]")
          .text($(parentElement).find("[data-product-price]").data("price"));
        let differance = parseFloat(compare_Price - regular_Price)
          .toFixed(2)
          .replace(".", ",");
        parentElement
          .find(".saving_value_text_pdp")
          .text("-" + differance + " €");
      }
    }, 1600);
  });

  const checkelsklip = setInterval(() => {
    const elsklipCheck = $(".elsklip-coupon__text");
    if (elsklipCheck.length > 0) {
      setTimeout(function () {
        let parentElement = elsklipCheck.closest(".product-single__meta");
        let _this = elsklipCheck.find("input");
        if (_this.is(":checked")) {
          let compare_Price = parsePrice(
            parentElement.find(".product__price.product__price--compare").text()
          );
          let regular_Price = parsePrice(
            parentElement.find(".elsklip-discounted-price").text()
          );
          parentElement
            .find("[data-product-price]")
            .text(regular_Price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+" €");
          let differance = parseFloat(compare_Price - regular_Price)
            .toFixed(2)
            .replace(".", ",");
          parentElement
            .find(".saving_value_text_pdp")
            .text("-" + differance + " €");
        }
      }, 1600);
      clearInterval(checkelsklip);
    }
  }, 500);

  //----------------------- Update Discount Value ----------------------

  $(document).on('click', '.show_all_color', function () {
    $(this).closest('.cp_swatches_list').removeClass('show_less_color');
    $(this).hide();
  });
  
});

//----------------------- Cart Drawer Timer -----------------------
const STORAGE_KEY = "cartCountdownTimer";
const EXPIRATION_KEY = "cartCountdownExpiration";
const DEVICE_TYPE_KEY = "cartCountdownDevice";
const EXPIRATION_DAYS = 1;

// Determine current device type
const currentDevice = window.innerWidth < 767 ? "mobile" : "desktop";
window.countdown_duration = currentDevice === "mobile" ? 60 * 10 : 60 * 15;

let globalTimer = null;
let globalInterval = null;

function getStoredTimer() {
  const storedTimer = localStorage.getItem(STORAGE_KEY);
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  const storedDevice = localStorage.getItem(DEVICE_TYPE_KEY);

  // Invalidate timer if device type has changed
  if (storedDevice && storedDevice !== currentDevice) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    localStorage.removeItem(DEVICE_TYPE_KEY);
    return null;
  }

  if (storedTimer && expiration) {
    if (new Date().getTime() > parseInt(expiration)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
      localStorage.removeItem(DEVICE_TYPE_KEY);
      return null;
    }
    return parseInt(storedTimer);
  }
  return null;
}

function setStoredTimer(timer) {
  localStorage.setItem(STORAGE_KEY, timer.toString());
  const expiration =
    new Date().getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(EXPIRATION_KEY, expiration.toString());
  localStorage.setItem(DEVICE_TYPE_KEY, currentDevice);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const display = document.querySelector("#cartCountdown");
  const alertElement = document.querySelector(".cartCountdownAlert");

  if (display && alertElement) {
    if (globalTimer <= 0) {
      clearInterval(globalInterval);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
      localStorage.removeItem(DEVICE_TYPE_KEY);
      alertElement.style.display = "none";
    } else {
      display.textContent = formatTime(globalTimer);
      setStoredTimer(globalTimer);
      alertElement.style.display = "block";
    }
  }
}

function startBackgroundTimer() {
  if (globalInterval) {
    clearInterval(globalInterval);
  }

  globalInterval = setInterval(() => {
    let storedTimer = getStoredTimer();
    if (storedTimer !== null) {
      globalTimer = storedTimer;
    }

    if (globalTimer > 0) {
      globalTimer--;
      setStoredTimer(globalTimer);
      updateTimerDisplay();
    } else {
      clearInterval(globalInterval);
    }
  }, 1000);
}

function initializeCartCountdown() {
  update_selector();
  const storedTimer = getStoredTimer();

  if (storedTimer === null) {
    globalTimer = window.countdown_duration;
    setStoredTimer(globalTimer);
  } else {
    globalTimer = storedTimer;
  }
  document.querySelector('.cartCountdown_main').style.display = 'block';
  updateTimerDisplay();
  startBackgroundTimer();
}

function setCountdownDuration(seconds) {
  window.countdown_duration = seconds;
  let storedTimer = getStoredTimer();
  if (storedTimer !== null) {
    globalTimer = storedTimer;
  } else {
    resetTimer();
  }
}

function resetTimer() {
  globalTimer = window.countdown_duration;
  setStoredTimer(globalTimer);
  updateTimerDisplay();
  startBackgroundTimer();
}

// Expose to global window
window.setCountdownDuration = setCountdownDuration;
window.resetTimer = resetTimer;

// Trigger on cart add event
document.addEventListener("ajaxProduct:added", initializeCartCountdown);

function checkInitially() {
  const storedTimer = getStoredTimer();

  if (storedTimer != null) {
    globalTimer = storedTimer;
  }else{
    setTimeout(function(){
      document.querySelector('.cartCountdown_main').style.display = 'none';
    },1000);
  }

  updateTimerDisplay();
  startBackgroundTimer();
}
checkInitially();

// const STORAGE_KEY = 'cartCountdownTimer';
// const EXPIRATION_KEY = 'cartCountdownExpiration';
// const EXPIRATION_DAYS = 1;

// if (window.innerWidth < 767){
//   window.countdown_duration = window.countdown_duration || 60 * 10;
// }else{
//   window.countdown_duration = window.countdown_duration || 60 * 15;
// }

// let globalTimer = null;
// let globalInterval = null;

// function getStoredTimer() {
//   const storedTimer = localStorage.getItem(STORAGE_KEY);
//   const expiration = localStorage.getItem(EXPIRATION_KEY);

//   if (storedTimer && expiration) {
//     if (new Date().getTime() > parseInt(expiration)) {
//       localStorage.removeItem(STORAGE_KEY);
//       localStorage.removeItem(EXPIRATION_KEY);
//       return null;
//     }
//     return parseInt(storedTimer);
//   }
//   return null;
// }

// function setStoredTimer(timer) {
//   localStorage.setItem(STORAGE_KEY, timer.toString());
//   const expiration = new Date().getTime() + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
//   localStorage.setItem(EXPIRATION_KEY, expiration.toString());
// }

// function formatTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
// }

// function updateTimerDisplay() {
//   const display = document.querySelector('#cartCountdown');
//   const alertElement = document.querySelector('.cartCountdownAlert');

//   if (display && alertElement) {
//     if (globalTimer <= 0) {
//       clearInterval(globalInterval);
//       localStorage.removeItem(STORAGE_KEY);
//       localStorage.removeItem(EXPIRATION_KEY);
//       alertElement.style.display = 'none';
//     } else {
//       display.textContent = formatTime(globalTimer);
//       setStoredTimer(globalTimer);
//       alertElement.style.display = 'block';
//     }
//   }
// }

// function startBackgroundTimer() {
//   if (globalInterval) {
//     clearInterval(globalInterval);
//   }

//   globalInterval = setInterval(() => {
//     let storedTimer = getStoredTimer();
//     if (storedTimer !== null) {
//       globalTimer = storedTimer;
//     }

//     if (globalTimer > 0) {
//       globalTimer--;
//       setStoredTimer(globalTimer);
//       updateTimerDisplay();
//     } else {
//       clearInterval(globalInterval);
//     }
//   }, 1000);
// }

// function initializeCartCountdown() {
//   const storedTimer = getStoredTimer();

//   if (storedTimer === null) {
//     globalTimer = window.countdown_duration;
//     setStoredTimer(globalTimer);
//   } else {
//     globalTimer = storedTimer;
//   }

//   updateTimerDisplay();
//   startBackgroundTimer();
// }

// function setCountdownDuration(seconds) {
//   window.countdown_duration = seconds;
//   let storedTimer = getStoredTimer();
//   if (storedTimer !== null) {
//     globalTimer = storedTimer;
//   }else{
//     resetTimer();
//   }
//   // if (globalTimer !== null) {
//   //   resetTimer();
//   // }
// }

// function resetTimer() {
//   globalTimer = window.countdown_duration;
//   setStoredTimer(globalTimer);
//   updateTimerDisplay();
//   startBackgroundTimer();
// }

// window.setCountdownDuration = setCountdownDuration;
// window.resetTimer = resetTimer;

// document.addEventListener("ajaxProduct:added", initializeCartCountdown);
//----------------------- End Cart Drawer Timer -----------------------
