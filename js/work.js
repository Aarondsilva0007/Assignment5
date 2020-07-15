window.onload = function () {
    document.getElementById('new-product-form').onsubmit = function (e) {
        e.preventDefault();
    }
    document.getElementById("range-form").onsubmit = function (e) {
        e.preventDefault();
    }
};

function clearOutput() {
    document.getElementById("primeOutput").innerHTML = "Result";
}

function findPrimary() {
    var inputs = document.getElementById("range-form").getElementsByTagName("input");
    var num1 = inputs[0].value;
    var num2 = inputs[1].value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById("primeOutput").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("POST", "./findPrime.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("num1=" + num1 + "&num2=" + num2);
}


getProducts();

function getProducts() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tableBody").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("POST", "./getProduct.php", true);
    xmlhttp.send();
}

function addProduct() {
    var inputs = document.getElementById("new-product-form").getElementsByClassName("form-control");
    var id = inputs[0].value;
    var name = inputs[1].value;
    var price = inputs[2].value;
    var description = inputs[3].value;
    if (name.length == 0 || id.length == 0 || price.length == 0) {
        document.getElementById("new-product-form").classList.add("was-validated");
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tableBody").innerHTML = this.responseText;
            for (var i = 0; i < 4; i++) {
                document.getElementById("new-product-form").getElementsByClassName("form-control")[i].value = "";
            }
        }
    }
    xmlhttp.open("POST", "./addProduct.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("product-id=" + id + "&product-name=" + name + "&product-price=" + price + "&product-description=" + description);
}

function deleteProduct(id) {
    console.log(arguments[0]);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getProducts();
            document.getElementById("tableBody").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("POST", "./deleteProduct.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id=' + id);
}
