$(function() {
    //transactions hub
    var search = document.getElementById("searchInput");
    var searchWrap = document.getElementById("searchWrap");
    var searchContact = document.getElementById("searchCntWrap");
    var contactField = document.getElementById("searchCnt");

    if(search != null){
        search.addEventListener("focus", function(e){
            searchWrap.classList.add('focus');
        });

        search.addEventListener("blur", function(e){
            if(isEmpty(search.value) == true){
                searchWrap.classList.remove('focus');
            }
        });
    }

    if(contactField != null){
        contactField.addEventListener("focus", function(e){
            searchContact.classList.add('focus');
        });

        contactField.addEventListener("blur", function(e){
            searchContact.classList.remove('focus');
        });
    }

});

function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; 
}