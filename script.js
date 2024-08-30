$(document).ready(function() {
  // Fetch product data from JSON
  $.getJSON('products.json', function(products) {
    // Create product grid dynamically
    $.each(products, function(index, product) {
      const productElement = $(`<div class="product">
                                    <img src="${product.images[0]}" alt="${product.name}" class="main-image">
                                    <h3>${product.name}</h3>
                                    <p>${product.description}</p>
                                    <div class="sizes">
                                      ${$.map(product.sizes, (quantity, size) => {
        return `<span class="size-tooltip" data-size="${size}" data-count="${quantity}">${size}: ${quantity}</span>`;
      }).join('')}
                                    </div>
                                    <div class="product-details">
                                      <div class="product-info">
                                        <h2>${product.name}</h2>
                                        <p>${product.description}</p>
                                        <div class="sizes">
                                          ${$.map(product.sizes, (quantity, size) => {
        return `<span class="size-tooltip" data-size="${size}" data-count="${quantity}">${size}: ${quantity}</span>`;
      }).join('')}
                                        </div>
                                      </div>
                                    </div>
                                  </div>`);

      // Click Event to Rotate Image
      productElement.find('.main-image').click(function() {
        let currentImageIndex = product.images.indexOf($(this).attr('src')); // Get current image index
        currentImageIndex = (currentImageIndex + 1) % product.images.length; // Increment and loop
        $(this).attr('src', product.images[currentImageIndex]); // Update image source
      });

      // Add tooltip functionality
      productElement.find('.size-tooltip').each(function() {
        const sizeSpan = $(this);
        sizeSpan.on('mouseover', function() {
          const size = sizeSpan.data('size');
          const count = sizeSpan.data('count');
          const tooltip = document.createElement('div');
          tooltip.classList.add('tooltip');
          tooltip.textContent = `${count} remaining in size ${size}`;
          tooltip.style.position = 'absolute';
          tooltip.style.top = `${sizeSpan.offset().top + sizeSpan.height()}px`;
          tooltip.style.left = `${sizeSpan.offset().left}px`;
          document.body.appendChild(tooltip);
        });
        sizeSpan.on('mouseout', function() {
          const tooltips = document.querySelectorAll('.tooltip');
          tooltips.forEach(tooltip => tooltip.remove());
        });
      });

      // Append product element to grid
      $('#product-grid').append(productElement);
    });
  });
});