var items = {
  "item1" : {
    "price" : 45.00
  },
  "item2" : {
    "price" : 14.86
  }
}

var subtotal;

function subTotal(){
  var i;
  var x = Object.keys(items);
  subtotal=0;
  for(i = 0; i < x.length; i++) {
    var id = x[i] + "_total";
    subtotal += parseFloat(document.getElementById(id).innerHTML);
  }
  subtotal = subtotal.toFixed(2);
  document.getElementById("subtotal").innerHTML = subtotal;

  // Tax Calculation
  var tax = 0.05 * subtotal;
  tax = tax.toFixed(2);
  document.getElementById("tax").innerHTML = tax;

  // Change Shipping Cost if price is not 0
  var shippping;
  if(subtotal != 0.00) {
    shipping = 15.00;
  } else {
    shipping = 0.00;
  }
  shipping = shipping.toFixed(2);
  document.getElementById("shipping").innerHTML = shipping;

  // Grand Total
  var gTotal = parseFloat(subtotal) + parseFloat(tax) + parseFloat(shipping);
  gTotal = gTotal.toFixed(2);
  console.log(gTotal);
  document.getElementById("grand_total").innerHTML = gTotal;
}

function update_total(e){
  var name = e.name;
  var price_single_unit = items[name]["price"];
  var units = e.value;
  var price = price_single_unit * units;
  price = price.toFixed(2);
  var target = e.name + "_total";
  document.getElementById(target).innerHTML = price;

  subTotal();
}


function reset_cart(e) {
  var item_name = e.name.split('_')[1];
  document.getElementsByName(item_name)[0].value = 0;
  document.getElementById(item_name+"_total").innerHTML = (0).toFixed(2);
  subTotal();
}
