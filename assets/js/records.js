var records = ["тест 000"];
var ul = document.createElement('ul');
    document.getElementById("idrecords").appendChild(ul);
 
    records.forEach(function(record){
      var li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += record;
    });

