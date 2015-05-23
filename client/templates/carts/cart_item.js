Template.cartItem.events({
  'click .remove-from-cart':function(event, template){
    event.preventDefault();
    if(confirm("Are You Sure?"))
      Cart.Items.remove({_id:this._id});
  }
});