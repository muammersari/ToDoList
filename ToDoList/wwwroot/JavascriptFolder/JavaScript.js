var toDoListCount = 0;
// Başlangıçta bugünün yarihini yazdırıyoruz ve minimum tarihi bugünün tarihi yapıyoruz ki kullanıcı  eski tarihe giriş yapmasın
$(document).ready(function () {
    $("#startDate").val(new Date().toISOString().substring(0, 10));
    $("#endDate").val(new Date().toISOString().substring(0, 10));
    document.getElementById("endDate").setAttribute("min", new Date().toISOString().substring(0, 10));
    document.getElementById("startDate").setAttribute("min", new Date().toISOString().substring(0, 10));
    GetList(); //sayfa yüklendiğinde otomatik olarak get list fonksiyonu çalıştırılıyor ki ilk açıldığında tüm görevler listelensin

    $("#startDateFilter").val(new Date().toISOString().substring(0, 10));
    $("#endDateFilter").val(new Date().toISOString().substring(0, 10));
});

//başlangıç tarihi seçildiğinde bitiş tarihinin minimum tarih yarını başlanıç tarihi yapıyoruz
$("#startDate").change(function () {
    document.getElementById("endDate").setAttribute("min", this.value)
});

//bitiş tarihi seçildiğinde başlangıç tarihinin maximum tarih yarını bitiş tarihi yapıyoruz
$("#endDate").change(function () {
    document.getElementById("startDate").setAttribute("max", this.value)
});

//başlangıç tarihi seçildiğinde bitiş tarihinin minimum tarih yarını başlanıç tarihi yapıyoruz
$("#startDateFilter").change(function () {
    document.getElementById("endDateFilter").setAttribute("min", this.value)
});

//bitiş tarihi seçildiğinde başlangıç tarihinin maximum tarih yarını bitiş tarihi yapıyoruz
$("#endDateFilter").change(function () {
    document.getElementById("startDateFilter").setAttribute("max", this.value)
});

// bugüne ekle seçeneği seçili ise tarih alanlarını kapatıyoruz
$("#checkboxToday").change(function () {
    if (this.checked) {
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
    } else {
        document.getElementById("startDate").disabled = false;
        document.getElementById("endDate").disabled = false;
    }
});

$("#btnSave").click(function () {
    if ($("#txtTitle").val().trim() != "" && $("#txtDescription").val().trim() != "" && $("#startDate").val().trim() != "" && $("#endDate").val().trim() != "") {

        var list = { //değerleri listeye aktarıyoruz
            Id: 0,
            Title: $("#txtTitle").val(),
            Description: $("#txtDescription").val(),
            StartDate: $("#startDate").val(),
            EndDate: $("#endDate").val(),
            Status: false
        }
        if (document.getElementById("checkboxToday").checked) { // burada bugüne ekle seçili ise sadece bugünün tarihi ekleniyor
            var today = new Date();
            list.StartDate = new Date().toISOString().substring(0, 10);
            list.EndDate = new Date().toISOString().substring(0, 10);
        }

        $.ajax({
            url: "/Home/SaveTask", //Liste veritabanına kaydedilmek üzere saveTask metoduna gönderildi
            type: "Post",
            data: list,
            success: function (response) {
                console.log(response);
                if (response == false)
                    alert("Görev Eklenemedi");
                else {
                    AddTable(response);//veriler tabloya eklenmek üzere AddTable fonksiyonuna gönderiliyor
                    alert("Görev Başaıyla Eklendi");
                    toDoListCount++; // görev sayısı bir arttırılıyor
                    CountMessage();
                }
            },
            error: function (err) { }
        });
    }
    else {
        alert("Lütfen Tüm Alanları Doldurunuz !");
    }
});

function GetList() {
    $.ajax({
        url: "/Home/GetList", // veritabanındaki tüm liste çekiliyor
        success: function (response) {
            console.log(response);
            if (response == false)
                CountMessage();
            else {
                AddTable(response);//veriler tabloya eklenmek üzere AddTable fonksiyonuna gönderiliyor
                toDoListCount = response.length; // görev sayısı belirleniyor
                CountMessage();
            }
        },
        error: function (err) { }
    });
}
// görev var mı yokmu kontrol ediliyor. var ise herhangi bir mesaj verilmiyor. 
// yok ise objectnull nesnesi aktif ediliyor ve nesne olmadığına dair uyarı mesajı veriliyor
function CountMessage() {
    if (toDoListCount == 0)
        document.getElementById("objectNull").style.display = "block";
    else
        document.getElementById("objectNull").style.display = "none";
}

$("#btnFilter").click(function () {
    $.ajax({
        url: "/Home/GetListByDateTime", // filtre verilerine göre iki tarih aralığı arasındaki görevler listeleniyor
        type: "Post",
        data: { startdDate: $("#startDateFilter").val(), endDate: $("#endDateFilter").val() },
        success: function (response) {
            console.log(response);
            if (response == false)
                alert("Filtreleme İşlemi Yapılamadı");
            else {
                document.getElementById("tableBody").innerHTML = "";
                AddTable(response); //veriler tabloya eklenmek üzere AddTable fonksiyonuna gönderiliyor
            }
        },
        error: function (err) { }
    });
});


function AddTable(toDoList) { //liste Tabloya Ekleniyor
    toDoList.forEach(function (item) {
        var tdId = document.createElement("td");
        tdId.innerText = item.id;
        var tdtitle = document.createElement("td");
        tdtitle.innerText = item.title;
        var tdDescription = document.createElement("td");
        tdDescription.innerText = item.description;
        var tdStartDate = document.createElement("td");
        tdStartDate.innerText = item.startDate.substring(0, 10);
        var TdEndDate = document.createElement("td");
        TdEndDate.innerText = item.endDate.substring(0, 10);
        var tdStatus = document.createElement("td");
        tdStatus.id = "statu" + item.id;

        var tr = document.createElement("tr");
        tr.id = "tr" + item.id;
        var tdSetting = document.createElement("td");
        var btnStatusOk = document.createElement("input"); ///Görev onaylama butonu
        btnStatusOk.type = "button";
        btnStatusOk.id = item.id;

        if (item.status == true) { // statu durumu tamamlandı ise
            tdStatus.innerText = "Tamamlandı";
            tdStatus.style.color = "green";
            btnStatusOk.className = "btn btn-success mt-1 btn-sm";
            btnStatusOk.value = "Onay";
        }
        else { // statü durumu tamamlanmadı ise
            tdStatus.innerText = "Tamamlanmadı";
            tdStatus.style.color = "red";
            btnStatusOk.className = "btn btn-danger mt-1 btn-sm";
            btnStatusOk.value = "Onay İptal";
        }

        btnStatusOk.onclick = function () {
            if (document.getElementById("statu" + this.id + "").innerText == "Tamamlandı") { // göreve onaylandı ise iptal etmek için
                var message = confirm("Görevi Onayını İptal İstediğinize Emin misiniz?");
                if (message == true) {
                    $.ajax({
                        url: "/Home/StatusUpdate", // görev durumu güncelleniyor
                        type: "Post",
                        data: { id: this.id, status: false },
                        success: function (response) {
                            if (response == false)
                                alert("Güncelleme işlemi gerçekleştirilemedi");
                            else {
                                btnStatusOk.value = "Onay İptal"; // görev onaylandı ise buton ismi onay iptal oluyor
                                btnStatusOk.className = "btn btn-danger mt-1 btn-sm"; // göre onaylandı ise buton kırmızı oluyor
                                document.getElementById("statu" + response.id + "").innerText = "Tamamlanmadı";
                                document.getElementById("statu" + response.id + "").style.color = "red";
                            }
                        },
                        error: function (err) { }
                    });
                }
            }
            else { // görev onaylı değilse onaylamak için
                var message = confirm("Görevi Tamamlandı Olarak Onaylıyor musunuz?");
                if (message == true) {
                    $.ajax({
                        url: "/Home/StatusUpdate", // görev durumu güncelleniyor
                        type: "Post",
                        data: { id: this.id, status: true },
                        success: function (response) {
                            if (response == false)
                                alert("Güncelleme işlemi gerçekleştirilemedi");
                            else {
                                btnStatusOk.value = "Onay"; // görev onaylanmadı ise buton ismi onay  oluyor
                                btnStatusOk.className = "btn btn-success mt-1 btn-sm";// görec onaylanmadı ise buton yeşil oluyor
                                document.getElementById("statu" + response.id + "").innerText = "Tamamlandı";
                                document.getElementById("statu" + response.id + "").style.color = "green";
                            }
                        },
                        error: function (err) { }
                    });
                }
            }
        }

        var btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "Sil";
        btnDelete.className = "btn btn-warning ml-2 mt-1 btn-sm";
        btnDelete.id = item.id;
        btnDelete.onclick = function () {
            var message = confirm("Görevi Silmek İstediğinize Emin misiniz?");
            if (message == true) {
                $.ajax({
                    url: "/Home/ToDoListDelete", // veri veritabanından siliniyor
                    type: "Post",
                    data: { id: this.id },
                    success: function (response) {
                        if (response == false)
                            alert("Silme işlemi gerçekleştirilemedi");
                        else {
                            $("#tr" + response.id + "").hide(400, function () { //veri tablodan siliniyor
                                $("#tr" + response.id + "").remove();
                            });
                            toDoListCount--; // görev sayısı bir eksiltiliyor
                            CountMessage();
                        }
                    },
                    error: function (err) { }
                });
            }
        }
        // sütunlar satırlara aktarılıyor
        tdSetting.append(btnStatusOk);
        tdSetting.append(btnDelete);
        tr.append(tdSetting);
        tr.appendChild(tdId);
        tr.appendChild(tdtitle);
        tr.appendChild(tdDescription);
        tr.appendChild(tdStartDate);
        tr.appendChild(TdEndDate);
        tr.appendChild(tdStatus);
        document.getElementById("tableBody").append(tr); //Tüm bilgiler tabloya aktarılıyor
    });
}