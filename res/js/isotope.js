document.addEventListener('DOMContentLoaded', function () {
  // init Isotope
  var elem = document.querySelector('.grid')
  if (!elem) return // Falls das Element nicht existiert, abbrechen

  var iso = new Isotope(elem, {
    itemSelector: '.grid-item',
    percentPosition: true,
    layoutMode: 'masonry',
    masonry: {
      columnWidth: '.grid-sizer'
    }
  })

  // layout Isotope after each image loads
  imagesLoaded(elem, function () {
    iso.layout()
  })

  // Filter
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function (itemElem) {
      var number = itemElem.querySelector('.number').textContent
      return parseInt(number, 10) > 50
    },
    // show if name ends with -ium
    ium: function (itemElem) {
      var name = itemElem.querySelector('.name').textContent
      return name.match(/ium$/)
    }
  }

  // bind filter button click
  var filtersElem = document.querySelector('.filters-button-group')
  filtersElem.addEventListener('click', function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, 'button')) {
      return
    }
    var filterValue = event.target.getAttribute('data-filter')
    // use matching filter function
    filterValue = filterFns[filterValue] || filterValue
    iso.arrange({ filter: filterValue })
  })

  // change is-checked class on buttons
  var buttonGroups = document.querySelectorAll('.button-group')
  for (var i = 0, len = buttonGroups.length; i < len; i++) {
    var buttonGroup = buttonGroups[i]
    radioButtonGroup(buttonGroup)
  }

  function radioButtonGroup(buttonGroup) {
    buttonGroup.addEventListener('click', function (event) {
      // only work with buttons
      if (!matchesSelector(event.target, 'button')) {
        return
      }
      buttonGroup.querySelector('.is-checked').classList.remove('is-checked')
      event.target.classList.add('is-checked')
    })
  }
})
