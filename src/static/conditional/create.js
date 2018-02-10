console.log("Loading script for conditional/create.js")

function cloneConditionalBlock() {
  var $this = $(this)
  var $parent = $this.parent().parent()
  var $block = $parent.clone(true)

  // reset defaults
  $block.find('input').val("")

  $parent.after( $block )
}

function deleteConditionalBlock() {
  $(this).parent().parent().remove()
}

function processFormData() {
  var response = {
    conditionals: [],
    defaults: [],
    locked: false,
    description: undefined
  }

  $('.has-error').removeClass('has-error')

  $('.form input:not(:valid)').each(function () {
    $(this).parents('.form-group').addClass('has-error')
  })

  $('form')
      .filter('[data-type="conditional"]')
      .each(function(c,e){
        var $elem = $(e).find('.input-group,.input-group-inline'),
            max = 0
        // validate the fields
        var $notEligible = $elem.find('[name="field"],[name="expression"],[name="targetUrl"]')
             .filter(function(i,e){ max = i; return $(e).val() === "" })
        if( max > 0 && $notEligible.length > 0 ) {
          // error, fields are missing values
          var keys = []
          $notEligible.each( function(i,e) {
            keys.push( $(e).attr('name') )
          })
          console.log("Error: Stuff is missing!", max, keys)
          return;
        }
        // field {name,value?}, match {type,value}, target {url}
        response.conditionals.push( {
            field : {
              type:$elem.find('select:first-of-type').val(),
              key:$elem.find('[name="field"]').val()
            },
            match : {
              type:$elem.find('select:last-of-type').val(),
              expression: $elem.find('[name="expression"]').val()
            },
            targetUrl : $elem.find('[name="targetUrl"]').val()
          })
      })

  $('form').filter('[data-type="default"]')
      .find('.form-control[type="text"]')
      .filter(function(i,e){
        return $(e).val() !== ""
      }).each(function(i,e){
        var $item = $(e)
        response.defaults.push( { name: $item.attr("name"), value: $item.val() } )
      })

  console.log("Response!!", response)
  $('input[name="response"]').val(JSON.stringify(response))
}

$('.btn.btn-success').on('click',cloneConditionalBlock)
$('.btn.btn-danger').on('click',deleteConditionalBlock)

var delayPFDTimer
function delayProcessFormData() {
  if( delayPFDTimer ) {
    clearTimeout(delayPFDTimer)
  }
  delayPFDTimer = setTimeout( processFormData.bind(this, arguments), 100)
}

$('form').on('keyup keypress change blur', '.form-control', delayProcessFormData)
$('form').on('click', '[type!="submit"].btn', delayProcessFormData)

$(document).ready(function() {
  processFormData()
})
