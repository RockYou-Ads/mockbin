console.log("Loading script for conditional/create.js")

function cloneConditionalBlock() {
  var $this = $(this)
  var $parent = $this.parent().parent()
  var $block = $parent.clone(true)
  var $selects = $block.find('select')

  // reset defaults
  $selects.each(function(i,e){
    var $e = $(e)
    $e.val( $e.children('option:first').val() )
  })
  $block.find('input').val("")
  //$block.find('select.form-control')
  //       .on('change', updateInputState)

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
        var $notEligible = $elem.find('[name="field"]:not([disabled]),[name="expression"],[name="targetUrl"]')
             .filter((i,e) => { max=i; return $(e).val() === "" })
        if( max > 0 && $notEligible.length > 0 ) {
          // error, fields are missing values
          var keys = []
          $notEligible.each(function(i,e) {
            keys.push( $(e).attr('name') )
          })
          console.log("Error: Stuff is missing!", max, $(e).attr('name'), keys)
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

  var simple = [ // Simple assignments  name=key, val()=value, evaluator
    { selector : '[name="description"] .form-control[name="description"]', parent: response },
    { selector : '[name="lock-status"] .form-control[name="locked"]', parent: response }
  ]
  simple.forEach(function(info){
    $(info.selector)
      .filter((i,e) => ( $(e).val() !== ""))
      .each(function(i,e){
        var $item = $(e)
        info.parent[$item.attr('name')] = info.eval && info.eval($item.val()) || $item.val();
      })
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

function updateInputState(event) {
  // console.log( this, e )
  var $e = $(this)
      $sel = $e.children(":selected")
  if( $sel.attr('required') ) {
    $e.next().removeAttr('disabled')
  } else {
    $e.next().attr('disabled',true)
  }
}

$('form').on('change', 'select.form-control.field-source', updateInputState)
$('form').on('keyup keypress change blur', '.form-control', delayProcessFormData)
$('form').on('click', '[type!="submit"].btn', delayProcessFormData)

$('select.form-control.field-source').each(function(i,e){
  updateInputState.call(e)
})

$(document).ready(function() {
  processFormData()
})
