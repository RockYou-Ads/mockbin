console.log("Loading script for conditional/create.js")

$(document).ready(function() {
  // find the buttons and attach copy handler

  $('.btn.btn-success').on('click',cloneConditionalBlock)
  $('.btn.btn-danger').on('click',deleteConditionalBlock)

})

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
