function update_cart(checkBox) {
	var amount = parseFloat(document.getElementById("totalPrice").innerHTML.substring(1));
	console.log(amount);
	var id = "item";
	var x = checkBox.id.slice(-1);
	id += x;
	console.log(document.getElementById(id).innerHTML);
	var item_value = parseFloat(document.getElementById(id).innerHTML.substring(1));
	if(checkBox.checked === true){
		console.log(item_value);
		amount += item_value;
		amount = amount.toFixed(2);
	} else {
		if(amount != 0){
			amount -= item_value;
			amount = amount.toFixed(2);
		}
	}
	document.getElementById("totalPrice").innerHTML = "$" + amount;
}